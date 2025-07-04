import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorService } from './calculator.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  // Signals para manejar el estado reactivo
  firstNumber = signal<number>(0);
  secondNumber = signal<number>(0);
  selectedOperation = signal<string>('suma');

  private calculatorService: CalculatorService = inject(CalculatorService);

  // Computed signal que calcula automáticamente el resultado
  result = computed(() => {
    const num1 = this.firstNumber();
    const num2 = this.secondNumber();
    const operation = this.selectedOperation();
    return this.calculatorService.calculate(num1, num2, operation);
  });

  // Array de operaciones disponibles
  operations = [
    { value: 'suma', label: 'Suma (+)' },
    { value: 'resta', label: 'Resta (-)' },
    { value: 'multiplicacion', label: 'Multiplicación (×)' },
    { value: 'division', label: 'División (÷)' },
  ];

  // Métodos para actualizar los signals
  updateFirstNumber(event: Event) {
    const target = event.target as HTMLInputElement;
    this.firstNumber.set(parseFloat(target.value) || 0);
  }

  updateSecondNumber(event: Event) {
    const target = event.target as HTMLInputElement;
    this.secondNumber.set(parseFloat(target.value) || 0);
  }

  updateOperation(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedOperation.set(target.value);
  }

  // Método para obtener el símbolo de la operación
  getOperationSymbol(operation: string): string {
    const symbols: { [key: string]: string } = {
      'suma': '+',
      'resta': '-',
      'multiplicacion': '×',
      'division': '÷'
    };
    return symbols[operation] || '+';
  }

  // Método para limpiar los campos
  clear() {
    this.firstNumber.set(0);
    this.secondNumber.set(0);
    this.selectedOperation.set('suma');
  }
}