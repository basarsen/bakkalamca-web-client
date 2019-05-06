import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export  class AuthInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler){
        
        if(req.url.indexOf('auth') !== -1)
            return next.handle(req);
            
        const token = localStorage.getItem('token');
        const newRequest = req.clone({
            headers: req.headers.set('x-auth-token', token)
        });
        return next.handle(newRequest);
    }
}