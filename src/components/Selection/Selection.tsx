import styles from './Selection.module.css';
export const Selection = (props) => {
  return (
    <div>
      <select name='' id='role' defaultValue={'1'} className={styles.select}>
        <option value='1' disabled>
          Selecciona una Opcion
        </option>
        {props.options.map((option) => (
          <option key={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};
