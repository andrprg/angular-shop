import { Observable, filter, tap } from "rxjs";
import type { MonoTypeOperatorFunction } from "rxjs";
import type { ZodType } from "zod";
import { environment } from "../../environments/environment";

export function inputIsNotNullOrUndefined<T>(input: null | undefined | T): input is T {
    return input !== null && input !== undefined;
}

export function isNotNullOrUndefined<T>() {
    return (source$: Observable<null | undefined | T>): Observable<T> => source$.pipe(filter(inputIsNotNullOrUndefined));
}

export function parseResponse<T>(schema: ZodType): MonoTypeOperatorFunction<T> {
    return tap({
        next: (value: any) => {
            try {
                schema.parse(value);
            } catch (error) {
                if (!environment.production) {
                    console.error(error);
                } else {
                    // Лог в sentry
                }
                throw error;
            }
            
        }
    })
}