# Shipping

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

**รูปแบบประกาศตัวแปร**
- ไฟล์ **.model.ts จะถูกตั้งชื่อตรงกับ Field ใน Table ฐานข้อมูล ใช้ตัวแปรแบบ snack case
- Class ขึ้นต้นด้วยตัวใหญ่ เช่น CustomersComponent
- Method ขึ้นต้นด้วยตัวเล็ก เช่น onSubmit, createCustomer
- ตัวแปร private ขึ้นต้นด้วย _ เช่น _customer, _alert, _modalService
- ตัวแปร public ใช้แบบ camel case
[เพิ่มเติม เทคนิคการตั้งชื่อตัวแปร](https://www.techstarthailand.com/blog/detail/Writing-Variables-Informative-Descriptive-Elegant/736?fbclid=IwAR2cg_7U279gWOyvz3VIKFJFv76chyun9SA49xOWTSu1MWefNJxJLB_wHeU)

**ตั้งค่า vscode ให้แก้ไขและจัด format โค้ดอัตโนมัติ**
- ติดตั้ง Extentions TSLint (deprecated)
- เข้าไปในส่วน Preferences > Settings ช่องค้นหาข้อมูลให้พิมพ์ >setting.json จะเจอคำว่า ***Edit in settings.json*** ให้คลิกเข้าไป
- วาง Script เพิ่มเติมลงไป
```bash
    "editor.formatOnSave": true,
    "[handlebars]": {
        "editor.formatOnSave": false
    },
    "tslint.autoFixOnSave": true
```