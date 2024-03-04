import '@analogjs/vite-plugin-angular/setup-vitest';

import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { getTestBed } from '@angular/core/testing';

getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

/*

Possible test scenarios

Provided we have the following terms:
- websites
- web development
- software engineering
- javascript
- typescript
- sql
- laravel
- cto
- python
- aws

User: "Can you make websites?"
Result:
- positive response
- (possible later on) list technologies used to make website (term matches)

User: "PHP, Laravel, CodeIgniter"
Result:
- positive response

User: "Do you use C# or .NET?"
Result:
- negative response
- (possible later on) list other technologies

*/
