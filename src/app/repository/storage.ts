import { BehaviorSubject, Observable, ReplaySubject, map } from "rxjs";

export interface IStorage {
    readonly storage: Storage;
    readonly state$: Observable<Record<string, any>>;
  
    getItem<T>(key: string): Observable<T>;
    setItem<T>(key: string, value: T): void;
    removeItem(key: string): void;
    clear(): void;
  }

  export abstract class AbstractStorage implements IStorage {
    readonly state$ = new BehaviorSubject<Record<string, any>>({});
  
    protected key = 'SHOP_DATA';
    protected state: Record<string, any> = {};
  
    protected constructor(public readonly storage: Storage) {
      this.setState(this.getLocalState());
    }
  
    clear(): void {
      this.setState({});
    }
  
    getItem<T = any>(key: string): Observable<T> {
      return this.state$.pipe(map((state) => (state.hasOwnProperty(key) ? state[key] : null)));
    }
  
    removeItem(key: string): void {
      if (key in this.state) {
        delete this.state[key];
  
        this.setState({ ...this.state });
      }
    }
  
    setItem<T = any>(key: string, value: T): void {
      this.setState({ ...this.state, [key]: value });
    }

    getItemValue<T = any>(key: string): T {
      return this.state[key];
    }
  
    protected setState(state: Record<string, any>): void {
      this.state = state;
      this.state$.next(this.state);
      this.setLocalState(this.state);
    }
  
    protected setLocalState(state: Record<string, any>): void {
      try {
        this.storage.setItem(this.key, JSON.stringify(state));
      } catch (error) {
        console.error(error);
      }
    }
  
    protected getLocalState(): Record<string, any> {
      const state = this.storage.getItem(this.key);
  
      return state ? JSON.parse(state) : {};
    }
  }