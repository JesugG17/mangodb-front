import styles from './Users.module.css';
import { Table } from '../../components/Table/Table';
import { _ } from 'gridjs-react';
import { FaPen, FaTimes } from 'react-icons/fa';
export const Users = () => {
  const data = [
    ['John', 'Doe', 28],
    ['Jane', 'Smith', 34],
    ['Alice', 'Brown', 23],
    ['Bob', 'White', 30],
  ];
  const columns = [
    { id: 'Usuario', name: 'Usuario', width: '31%', sort: true },
    { id: 'Correo', name: 'Correo', width: '21%', sort: true },
    { id: 'Permisos', name: 'Permisos', width: '21%', sort: true },
    {
      id: 'e',
      name: '',
      width: '4%',
      formatter: (...args) =>
        _(
          <>
            <button className={styles.tablabtn}>
              <FaPen />
            </button>
            <button className={styles.tablabtn}>
              <FaTimes />
            </button>
          </>
        ),
    },
  ];
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <button className={styles.button}>Crear Usuario</button>
        </header>
        <main>
          <Table data={data} columns={columns} />
        </main>
      </div>
    </div>
  );
};
