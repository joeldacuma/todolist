import { Validators } from '@angular/forms';

export const TaskModel = {
  name: ['', Validators.required],
  description: ['', Validators.required],
  created: ['', Validators.required]
};
