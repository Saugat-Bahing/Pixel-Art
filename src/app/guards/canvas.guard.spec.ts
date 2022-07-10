import { TestBed } from '@angular/core/testing';

import { CanvasGuard } from './canvas.guard';

describe('CanvasGuard', () => {
  let guard: CanvasGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanvasGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
