import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;

  beforeEach(() => {
    component = new ListComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('unselected providers', () => {
    it('should have an initial length of 3', () => {
      expect(component.unselectedProviders.length).toEqual(3);
    });

    it('should have an id', () => {
      expect(component.unselectedProviders[0].id).toEqual('1');
    });

    it('should have a name', () => {
      expect(component.unselectedProviders[0].name).toEqual('John');
    });

    it('should have an address', () => {
      expect(component.unselectedProviders[0].address).toEqual('123 Greenway Blvd');
    });

    it('should have a phone', () => {
      expect(component.unselectedProviders[0].phone).toEqual('8991234321');
    });

    it('selectProviders() called should decrease unselected by one', () => {
      const size_unselected = component.unselectedProviders.length;
      component.clickProvider('1');
      component.selectProviders();
      expect(component.unselectedProviders.length).toEqual(size_unselected - 1);
    });

    it('selectProviders() called should decrease unselected by two', () => {
      const size_unselected = component.unselectedProviders.length;
      component.clickProvider('1');
      component.clickProvider('2');
      component.selectProviders();
      expect(component.unselectedProviders.length).toEqual(size_unselected - 2);
    });

    it('selectProviders() called should increase selected by one', () => {
      const size_selected = component.selectedProviders.length;
      component.clickProvider('1');
      component.selectProviders();
      expect(component.selectedProviders.length).toEqual(size_selected + 1);
    });

    it('selectProviders() called should increase selected by two', () => {
      const size_selected = component.selectedProviders.length;
      component.clickProvider('1');
      component.clickProvider('2');
      component.selectProviders();
      expect(component.selectedProviders.length).toEqual(size_selected + 2);
    });
  });

  describe('selected providers', () => {
    it('should have no initial length', () => {
      expect(component.selectedProviders.length).toEqual(0);
    });

    it('unselectProvider() called', () => {
      let size_selected = component.selectedProviders.length;
      component.clickProvider('1');
      component.selectProviders();
      size_selected++;
      component.unselectProvider(0);
      expect(component.selectedProviders.length).toEqual(size_selected - 1);
    });
  });
});
