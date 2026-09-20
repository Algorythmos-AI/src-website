import * as migration_20260920_034139_initial from './20260920_034139_initial';

export const migrations = [
  {
    up: migration_20260920_034139_initial.up,
    down: migration_20260920_034139_initial.down,
    name: '20260920_034139_initial'
  },
];
