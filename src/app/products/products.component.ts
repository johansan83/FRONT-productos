// ─── src/app/products/products.component.ts

import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService, Producto } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * Componente para gestionar la lista de productos con funcionalidad CRUD:
 * – Mostrar listado actual
 * – Agregar nuevo producto
 * – Editar producto existente
 * – Eliminar producto con confirmación
 */
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  /** Array de productos obtenidos desde el backend */
  productos: Producto[] = [];
  /** Formulario reactivo que controla campos del producto */
  form: FormGroup;
  /** Flag que indica si estamos en modo edición */
  editMode = false;
  /** ID del producto seleccionado para editar (en modo edición) */
  editId: number | null = null;
  /** Instancia del modal Bootstrap */
  private modalInstance?: bootstrap.Modal;

  constructor(
    private svc: ProductService,
    private fb: FormBuilder
  ) {
    // Inicializa el formulario con validaciones
    this.form = this.fb.group({
      id: [{ value: '', disabled: true }], // campo de solo lectura
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]]
    });
  }

  /**
   * Al inicializar el componente:
   * - Carga los productos (GET)
   * - Configura el modal e implementa desenfoque al cerrarlo
   */
  ngOnInit() {
    this.load();

    // Obtener el elemento modal del DOM
    const el = document.getElementById('productModal');
    if (el) {
      this.modalInstance = new bootstrap.Modal(el);

      // Evita que el botón permanezca en foco oculto al cerrar el modal
      el.addEventListener('hide.bs.modal', () => {
        (document.activeElement as HTMLElement)?.blur();
      });
    }
  }

  /**
   * Carga la lista de productos desde el backend
   */
  load() {
    this.svc.getAll().subscribe(data => this.productos = data);
  }

  /**
   * Prepara el formulario para agregar producto:
   * - Restablece valores
   * - Muestra el modal
   */
  startAdd() {
    this.editMode = false;
    this.editId = null;
    this.form.reset({
      id: '',
      nombre: '',
      descripcion: '',
      precio: 0
    });
    this.modalInstance?.show();
  }

  /**
   * Prepara el formulario para editar un producto existente:
   * - Establece modo edición y valores iniciales
   * - Muestra el modal
   * @param p Producto seleccionado para editar
   */
  startEdit(p: Producto) {
    this.editMode = true;
    this.editId = p.id;
    this.form.patchValue({
      id: p.id,
      nombre: p.nombre,
      descripcion: p.descripcion,
      precio: p.precio
    });
    this.modalInstance?.show();
  }

  /**
   * Envía los datos del formulario al servidor para crear o actualizar:
   * - Llama al servicio y suscribe a respuesta
   * - En éxito: cierra modal y recarga la lista
   * - En error: muestra alerta con mensaje detallado
   */
  submit() {
    if (this.form.invalid) return;

    const op = this.editMode
      ? this.svc.update(this.editId!, this.form.value)
      : this.svc.create(this.form.value);

    op.subscribe({
      next: () => {
        this.modalInstance?.hide();
        this.load();
      },
      error: err => {
        const msg = err.error?.message || 'Error al guardar el producto';
        alert(msg);
      }
    });
  }

  /**
   * Elimina un producto luego de confirmar:
   * - Muestra confirmación nativa
   * - Si el usuario acepta, llama al servicio y recarga la lista
   * @param id ID del producto a eliminar
   */
  delete(id: number) {
    if (!confirm('¿Confirmar eliminación?')) return;
    this.svc.delete(id).subscribe(() => this.load());
  }

  /**
   * Cierra el modal de forma manual sin guardar cambios
   */
  cancel() {
    this.modalInstance?.hide();
  }
}
