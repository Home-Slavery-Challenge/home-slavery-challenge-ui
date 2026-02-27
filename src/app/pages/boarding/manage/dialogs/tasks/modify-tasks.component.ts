import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AlertComponent} from '../../../../../components/alert/alert.component';
import {ClrComboboxModule, ClrCommonFormsModule, ClrIconModule, ClrInputModule, ClrModalModule} from '@clr/angular';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Challenge} from '../../../../../types/challenge';
import {AlertType} from '../../../../../types/alert';
import {NgForOf, NgIf} from '@angular/common';
import {TasksAvailable} from '../../../../../types/task';
import {ChallengeService} from '../../../../../services/challenge.service';

@Component({
  selector: 'app-modify-tasks',
  imports: [
    AlertComponent,
    ClrComboboxModule,
    ClrCommonFormsModule,
    ClrIconModule,
    ClrModalModule,
    ReactiveFormsModule,
    NgForOf,
    ClrInputModule,
    NgIf
  ],
  templateUrl: './modify-tasks.component.html',
  styleUrl: './modify-tasks.component.css'
})
export class ModifyTasksComponent implements OnInit {
  @Input() challenge!: Omit<Challenge, "periods">;
  @Output() alert = new EventEmitter<{ type: AlertType, message: string }>();
  modalOpen = false;

  tasks: TasksAvailable[] = [];

  constructor(private challengeService: ChallengeService) {}

  ngOnInit(): void {
    this.tasks = [...(this.challenge.availableTasks ?? [])];
  }

  taskForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    points: new FormControl('', [Validators.required, Validators.min(0)]),
  });

  handleClose() {
    this.modalOpen = false;
    this.taskForm.reset();
  }

  addTask() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const newTask: TasksAvailable = {
      name: this.taskForm.value['name']!,
      defaultsPoints: Number(this.taskForm.value['points']!),
    } as TasksAvailable;

    this.tasks.push(newTask);

    this.taskForm.reset({ name: '', points: '' });
  }

  handleDeleteTask(taskId: number) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }

  reinitTasks() {
    this.tasks = [...(this.challenge.availableTasks ?? [])];
  }

  handleModify() {
    if (!this.tasks.length) {
      this.alert.emit({ type: "danger", message: "You need at least 1 task" });
      return;
    }

    const updatedChallenge: Omit<Challenge, "periods"> = {
      ...this.challenge,
      availableTasks: this.tasks,
    };

    this.challengeService.updateChallenge(updatedChallenge).subscribe({
      next: (res) => this.alert.emit({ type: "success", message: `${res.message} modified successfully` }),
      error: (err) =>
        this.alert.emit({
          type: "danger",
          message: err?.error?.message ?? "Error during modify challenge",
        }),
    });

    this.modalOpen = false;
  }
}
