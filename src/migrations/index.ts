import * as migration_20260920_034139_initial from './20260920_034139_initial';
import * as migration_20261111_114026_src_phase1_social_about from './20261111_114026_src_phase1_social_about';
import * as migration_20261111_133128_src_phase2_galleries from './20261111_133128_src_phase2_galleries';

export const migrations = [
  {
    up: migration_20260920_034139_initial.up,
    down: migration_20260920_034139_initial.down,
    name: '20260920_034139_initial',
  },
  {
    up: migration_20261111_114026_src_phase1_social_about.up,
    down: migration_20261111_114026_src_phase1_social_about.down,
    name: '20261111_114026_src_phase1_social_about',
  },
  {
    up: migration_20261111_133128_src_phase2_galleries.up,
    down: migration_20261111_133128_src_phase2_galleries.down,
    name: '20261111_133128_src_phase2_galleries'
  },
];
