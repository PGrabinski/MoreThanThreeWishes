import { TestBed, inject } from '@angular/core/testing';
import { StatePipe } from './state.pipe';

describe('StatePipe', () => {
  let statePipeInstance: StatePipe;

  // Setup before each spec
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ StatePipe ]
  }));

  beforeEach( inject( [ StatePipe ], pipe => {
    statePipeInstance = pipe;
    })
  );

  // Specs for the class
  it('Create an instance', () => {
    expect(statePipeInstance).toBeTruthy();
  });

  it('Should transform "awaiting" into "Awaiting"', () => {
    expect(statePipeInstance.transform('awaiting')).toEqual('Awaiting');
  });

  it('Should transform "cameTrue" into "Came True"', () => {
    expect(statePipeInstance.transform('cameTrue')).toEqual('Came true');
  });

  it('Should return empty string in case of some other values', () => {
    expect(statePipeInstance.transform('aSDasjdsdkias5354')).toEqual('');
  });
});
