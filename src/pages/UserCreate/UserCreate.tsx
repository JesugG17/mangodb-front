import styles from './UserCreate.module.css';
import { Selection } from '../../components/Selection/Selection';
interface Option {
  value: string;
  label: string;
}
const opciones: Option[] = [
  { value: 'admin', label: 'Administrador del Sistema' },
  { value: 'lider_recoleccion', label: 'Lider de Recolección' },
  { value: 'gerente_almacen', label: 'Gerente de almacen' },
];
export const UserCreate = () => {
  return (
    <div>
      <h1>Crear Usuarios</h1>
      <form className={styles.form}>
        <div className={styles.divs}>
          <label htmlFor='nombre'>Nombre del Usuario</label>
          <input type='text' name='name' id='nombre' />
        </div>
        <div className={styles.divs}>
          <label htmlFor='correo'>Correo del usuario</label>
          <input type='email' name='' id='correo' />
        </div>
        <div className={styles.divs}>
          <label htmlFor='password'>Contraseña</label>
          <input type='password' name='' id='password' />
        </div>
        <div className={styles.divs}>
          <label htmlFor='password2'>Verificar Contraseña</label>
          <input type='password' name='' id='password2' />
        </div>
        <div className={styles.divs}>
          <label htmlFor='role'>Seleccionar Rol de Usuario</label>
          <Selection options={opciones} />
        </div>
        <button type='submit' value='' className={styles.button}>
          Guardar
        </button>
      </form>
    </div>
  );
};
