import { Injectable } from '@angular/core';

export class PassportModelService {
  constructor(
    public firstName: string,
    public lastName: string,
    public age: number,
    public state: string,
    public city: string,
    public pincode: string,
    public line1: string,
    public line2: string,
    public phoneNumber: string,
    public passportNumber: string,
    public email: string,
    public passportDocument: File
  ) {}
  
}
