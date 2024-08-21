"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[479],{6479:(R,m,n)=>{n.r(m),n.d(m,{LoginComponent:()=>O});var o=n(7788),t=n(7222),l=n(5468),g=n(4587),d=n(6182),f=n(2221),u=n(9675),p=n(3209),v=n(5860);class h extends v.b{constructor(s){super(),this.email=s.email,this.password=s.password}}var F=n(6166),b=n(5981),y=n(4526),C=n(6347),E=n(7212),j=n(6610),k=n(3577),L=n(1392);const M=()=>["../","register"];function S(r,s){1&r&&(o.j41(0,"span",12),o.EFF(1," Signing in "),o.k0s())}function P(r,s){1&r&&(o.j41(0,"span",12),o.EFF(1," Sign in "),o.j41(2,"mat-icon"),o.EFF(3,"arrow_right_alt"),o.k0s()())}var c;(c||(c={})).initialize=function s(a){return a.group({email:a.control("",{validators:[t.k0.required,t.k0.email]}),password:a.control("",{validators:[t.k0.required,t.k0.minLength(8)]})})};let O=(()=>{class r{constructor(){this.fb=(0,o.WQX)(t.Qk),this.destroyRef=(0,o.WQX)(o.abz),this.userService=(0,o.WQX)(p.D),this.router=(0,o.WQX)(u.Ix),this.formErrorService=(0,o.WQX)(F._),this.isLoading$=new b.t(!1),this.loginForm=c.initialize(this.fb)}onSubmit(){if(this.loginForm.markAllAsTouched(),this.loginForm.invalid)return;this.isLoading$.next(!0);const a=new h(this.loginForm.getRawValue());this.userService.login(a).pipe((0,y.W)(e=>{throw e instanceof L.Q&&this.formErrorService.displayResponseError(this.loginForm,e),Error}),(0,C.j)(()=>{this.isLoading$.next(!1)}),(0,E.pQ)(this.destroyRef)).subscribe(()=>this.router.navigate(["/"],{replaceUrl:!0}))}static#o=this.\u0275fac=function(e){return new(e||r)};static#n=this.\u0275cmp=o.VBU({type:r,selectors:[["camp-login"]],standalone:!0,features:[o.aNF],decls:30,vars:14,consts:[[1,"header-container"],[1,"header-title"],[1,"header-subtitle"],[1,"form",3,"ngSubmit","formGroup"],[1,"form-control"],[1,"form__label"],["subscriptSizing","dynamic","appearance","outline",1,"form__input-field"],["matIconPrefix",""],["matInput","","type","email","placeholder","Enter your email",3,"formControl"],[3,"touched","control"],[1,"form__actions"],["mat-stroked-button","","type","submit",1,"form__button",3,"disabled"],[1,"button__label"],[1,"form__navigate","navigate"],["replaceUrl","true",1,"navigate__link",3,"routerLink"]],template:function(e,i){1&e&&(o.j41(0,"div",0)(1,"h1",1),o.EFF(2,"Welcome back"),o.k0s(),o.j41(3,"p",2),o.EFF(4,"Sign in to access to you dashboard."),o.k0s()(),o.j41(5,"form",3),o.bIt("ngSubmit",function(){return i.onSubmit()}),o.j41(6,"section",4)(7,"label",5),o.EFF(8,"Email"),o.k0s(),o.j41(9,"mat-form-field",6)(10,"mat-icon",7),o.EFF(11,"email"),o.k0s(),o.nrm(12,"input",8),o.j41(13,"mat-error")(14,"span"),o.EFF(15),o.k0s()()()(),o.j41(16,"section",4)(17,"label",5),o.EFF(18,"Password"),o.k0s(),o.nrm(19,"camp-input-password",9),o.k0s(),o.j41(20,"section",10)(21,"button",11),o.nI1(22,"async"),o.DNE(23,S,2,0,"span",12),o.nI1(24,"async"),o.DNE(25,P,4,0,"span",12),o.k0s(),o.j41(26,"div",13),o.EFF(27," No account? "),o.j41(28,"a",14),o.EFF(29,"Create an account"),o.k0s()()()()),2&e&&(o.R7$(5),o.Y8G("formGroup",i.loginForm),o.R7$(7),o.Y8G("formControl",i.loginForm.controls.email),o.R7$(3),o.JRh(i.formErrorService.getErrors(i.loginForm.controls.email)),o.R7$(4),o.Y8G("touched",i.loginForm.controls.password.touched)("control",i.loginForm.controls.password),o.R7$(2),o.Y8G("disabled",i.loginForm.invalid)("disabled",o.bMT(22,9,i.isLoading$)),o.R7$(2),o.vxM(o.bMT(24,11,i.isLoading$)?23:25),o.R7$(5),o.Y8G("routerLink",o.lJ4(13,M)))},dependencies:[j.Jj,k.t,t.X1,t.qT,t.me,t.BC,t.cb,t.l_,t.j4,l.RG,l.rl,l.TL,l.JW,g.fS,g.fg,d.m_,d.An,f.Hl,f.$z,u.Wk],styles:[".auth[_ngcontent-%COMP%]{background-color:var(--primary-light-color);display:flex;width:100vw;height:100vh;justify-content:center;align-items:center}.content-wrapper[_ngcontent-%COMP%]{display:block;width:30%;background-color:var(--background-color);padding:var(--spacing-xl);border-radius:var(--border-radius-md)}.header-container[_ngcontent-%COMP%]{text-align:center;display:block}.header-title[_ngcontent-%COMP%]{font-size:40px;color:var(--primary-color)}.header-subtitle[_ngcontent-%COMP%]{margin-top:var(--spacing-sm);margin-bottom:0;color:var(--primary-dark-color)}.form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:var(--spacing-md)}.form-control[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:var(--spacing-sm)}.form__label[_ngcontent-%COMP%]{font-weight:var(--font-weight-medium);color:var(--primary-dark-color)}.form__button[_ngcontent-%COMP%]{width:100%}.button__label[_ngcontent-%COMP%]{display:flex;justify-content:center;gap:var(--spacing-sm);font-size:var(--font-size-md)}.form__navigate[_ngcontent-%COMP%]{margin-top:var(--spacing-lg);text-align:center}.navigate__link[_ngcontent-%COMP%]{color:var(--primary-color);text-decoration:none}","[_nghost-%COMP%]{display:flex;flex-direction:column;gap:var(--spacing-lg)}"],changeDetection:0})}return r})()}}]);