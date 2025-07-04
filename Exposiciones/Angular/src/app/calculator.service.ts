import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  constructor() {}

  /**
   * Realiza la operación aritmética especificada
   * @param num1 Primer número
   * @param num2 Segundo número
   * @param operation Tipo de operación
   * @returns Resultado de la operación
   */
  calculate(num1: number, num2: number, operation: string): number | string {
    switch (operation) {
      case 'suma':
        return this.suma(num1, num2);

      case 'resta':
        return this.resta(num1, num2);

      case 'multiplicacion':
        return this.multiplicacion(num1, num2);

      case 'division':
        return this.division(num1, num2);

      default:
        return 'Operación no válida';
    }
  }

  /**
   * Suma dos números
   */
  private suma(a: number, b: number): number {
    return a + b;
  }

  /**
   * Resta dos números
   */
  private resta(a: number, b: number): number {
    return a - b;
  }

  /**
   * Multiplica dos números
   */
  private multiplicacion(a: number, b: number): number {
    return a * b;
  }

  /**
   * Divide dos números
   */
  private division(a: number, b: number): number | string {
    if (b === 0) {
      return 'Error: División por cero';
    }
    return a / b;
  }
}
