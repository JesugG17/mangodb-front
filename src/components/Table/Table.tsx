import { Grid } from 'gridjs-react';
import styles from './Table.module.css';
import { esES } from 'gridjs/l10n';
export const Table = (props) => {
  return (
    <div className={styles.gridjs}>
      <Grid
        data={props.data}
        search={true}
        pagination={{
          limit: 20,
        }}
        language={esES}
        columns={props.columns}
      />
    </div>
  );
};
