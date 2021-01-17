import { TestBed } from '@angular/core/testing';

import { OrdersItemService } from './orders-item.service';

describe('OrdersItemService', () => {
  let service: OrdersItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
