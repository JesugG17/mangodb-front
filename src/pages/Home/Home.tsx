import { Sprout } from 'lucide-react';
import { FirstLetterGreen } from '@/components/FirstLetterGreen/FirstLetterGreen';
import styles from './Home.module.css';

export const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Sprout size={40} color='#98a75f' />
        <FirstLetterGreen label='Bienvenido' style={{ fontSize: 40 }} />
      </div>
      <div className={styles.containerInfo}>
        <span className={styles.titleDesc}>
          {' '}
          Agrícola MangoDB: De la tradición a la tecnología{' '}
        </span>
        <p className={styles.desc}>
          Agrícola MangoDB, una empresa dedicada al cultivo del mango enana, enfrenta desafíos en la
          gestión de sus cultivos y almacenes. La falta de un sistema informático eficiente impacta
          negativamente en la calidad y cantidad de la producción, afectando sus exportaciones.
          <p>
            Para solucionar este problema, se desarrollará una aplicación web que permita lo
            siguiente:
          </p>
          <p>-Monitoree las plantas en tiempo real a través de sensores. </p>
          <p>-Optimice la cosecha y distribución de los mangos. </p>
          <p>-Garantice la calidad del producto y su trazabilidad. </p>
          <p>-Facilite la toma de decisiones basadas en datos. </p>
          <p>
            -Con esta nueva herramienta, MangoDB espera aumentar su eficiencia, mejorar la calidad
            de sus productos y expandir su presencia en el mercado internacional.{' '}
          </p>
        </p>
      </div>
    </div>
  );
};
