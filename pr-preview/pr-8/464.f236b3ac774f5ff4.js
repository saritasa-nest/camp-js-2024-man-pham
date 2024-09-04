"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[464],{9464:(M,m,t)=>{t.r(m),t.d(m,{RegistrationComponent:()=>$});var r=t(7788),n=t(7222),c=t(9675),d=t(2221),l=t(5468),f=t(4587),g=t(6182),u=t(6166),h=t(5981),v=t(4526),F=t(6347),b=t(6610),C=t(9897),p=t(7212);function E(e){return a=>a.value!==e.value?{mustMatch:!0}:null}var y=t(341),R=t(5860);class j extends R.b{constructor(a){super(),this.email=a.email,this.password=a.password,this.firstName=a.firstName,this.lastName=a.lastName}}const k=()=>["../","login"];function w(e,a){1&e&&(r.j41(0,"span",19),r.EFF(1," Creating "),r.k0s())}function P(e,a){1&e&&(r.j41(0,"span",19),r.EFF(1," Create account "),r.j41(2,"mat-icon"),r.EFF(3,"arrow_right_alt"),r.k0s()())}let $=(()=>{class e{constructor(){this.fb=(0,r.WQX)(n.Qk),this.destroyRef=(0,r.WQX)(r.abz),this.userService=(0,r.WQX)(C.D),this.router=(0,r.WQX)(c.Ix),this.formErrorService=(0,r.WQX)(u._),this.isLoading$=new h.t(!1),this.registrationForm=this.initializeForm()}onSubmit(){if(this.registrationForm.markAllAsTouched(),this.registrationForm.invalid)return;this.isLoading$.next(!0);const s=new j(this.registrationForm.getRawValue());this.userService.register(s).pipe((0,v.W)(i=>{throw this.formErrorService.handleResponseError(this.registrationForm,i),Error}),(0,F.j)(()=>{this.isLoading$.next(!1)}),(0,p.pQ)(this.destroyRef)).subscribe(()=>this.router.navigate(["/"],{replaceUrl:!0}))}initializeForm(){const s=this.fb.control("",[n.k0.required]),i=this.fb.control("",[n.k0.required,E(s)]);return s.valueChanges.pipe((0,p.pQ)(this.destroyRef)).subscribe(()=>{i.updateValueAndValidity()}),this.fb.group({email:this.fb.control("",[n.k0.required,n.k0.email]),firstName:this.fb.control("",[n.k0.required]),lastName:this.fb.control("",[n.k0.required]),password:s,confirmPassword:i})}static#r=this.\u0275fac=function(i){return new(i||e)};static#t=this.\u0275cmp=r.VBU({type:e,selectors:[["camp-registration"]],standalone:!0,features:[r.aNF],decls:50,vars:22,consts:[[1,"header-container"],[1,"header-title"],[1,"header-subtitle"],[1,"form",3,"ngSubmit","formGroup"],[1,"form-control"],["for","email",1,"form__label"],["subscriptSizing","dynamic","appearance","outline",1,"form__input-field"],["matIconPrefix",""],["matInput","","type","email","id","email","placeholder","Enter your email",3,"formControl"],["for","first-name",1,"form__label"],["matInput","","type","text","id","first-name","placeholder","Enter your first name",3,"formControl"],["for","last-name",1,"form__label"],["matInput","","id","last-name","type","text","placeholder","Enter your last name",3,"formControl"],["for","password",1,"form__label"],[3,"id","touched","control"],["for","confirm-password",1,"form__label"],[3,"id","touched","control","placeholder"],[1,"form__actions"],["mat-stroked-button","","type","submit",1,"form__button",3,"disabled"],[1,"button__label"],[1,"form__navigate","navigate"],["replaceUrl","true",1,"navigate__link",3,"routerLink"]],template:function(i,o){1&i&&(r.j41(0,"div",0)(1,"h1",1),r.EFF(2,"Greetings"),r.k0s(),r.j41(3,"p",2),r.EFF(4,"Sign up to experience interesting features!"),r.k0s()(),r.j41(5,"form",3),r.bIt("ngSubmit",function(){return o.onSubmit()}),r.j41(6,"section",4)(7,"label",5),r.EFF(8,"Email"),r.k0s(),r.j41(9,"mat-form-field",6)(10,"mat-icon",7),r.EFF(11,"email"),r.k0s(),r.nrm(12,"input",8),r.j41(13,"mat-error")(14,"span"),r.EFF(15),r.k0s()()()(),r.j41(16,"section",4)(17,"label",9),r.EFF(18,"First name"),r.k0s(),r.j41(19,"mat-form-field",6),r.nrm(20,"input",10),r.j41(21,"mat-error")(22,"span"),r.EFF(23),r.k0s()()()(),r.j41(24,"section",4)(25,"label",11),r.EFF(26,"Last name"),r.k0s(),r.j41(27,"mat-form-field",6),r.nrm(28,"input",12),r.j41(29,"mat-error")(30,"span"),r.EFF(31),r.k0s()()()(),r.j41(32,"section",4)(33,"label",13),r.EFF(34,"Password"),r.k0s(),r.nrm(35,"camp-password-input",14),r.k0s(),r.j41(36,"section",4)(37,"label",15),r.EFF(38,"Confirm Password"),r.k0s(),r.nrm(39,"camp-password-input",16),r.k0s(),r.j41(40,"div",17)(41,"button",18),r.nI1(42,"async"),r.DNE(43,w,2,0,"span",19),r.nI1(44,"async"),r.DNE(45,P,4,0,"span",19),r.k0s(),r.j41(46,"div",20),r.EFF(47," Have an account already? "),r.j41(48,"a",21),r.EFF(49,"Sign in"),r.k0s()()()()),2&i&&(r.R7$(5),r.Y8G("formGroup",o.registrationForm),r.R7$(7),r.Y8G("formControl",o.registrationForm.controls.email),r.R7$(3),r.JRh(o.formErrorService.getErrors(o.registrationForm.controls.email)),r.R7$(5),r.Y8G("formControl",o.registrationForm.controls.firstName),r.R7$(3),r.JRh(o.formErrorService.getErrors(o.registrationForm.controls.firstName)),r.R7$(5),r.Y8G("formControl",o.registrationForm.controls.lastName),r.R7$(3),r.JRh(o.formErrorService.getErrors(o.registrationForm.controls.lastName)),r.R7$(4),r.Y8G("id","password")("touched",o.registrationForm.controls.password.touched)("control",o.registrationForm.controls.password),r.R7$(4),r.Y8G("id","confirm-password")("touched",o.registrationForm.controls.confirmPassword.touched)("control",o.registrationForm.controls.confirmPassword)("placeholder","Confirm password"),r.R7$(2),r.Y8G("disabled",r.bMT(42,17,o.isLoading$)),r.R7$(2),r.vxM(r.bMT(44,19,o.isLoading$)?43:45),r.R7$(5),r.Y8G("routerLink",r.lJ4(21,k)))},dependencies:[b.Jj,n.X1,n.qT,n.me,n.BC,n.cb,n.l_,n.j4,l.RG,l.rl,l.TL,l.JW,f.fS,f.fg,g.m_,g.An,d.Hl,d.$z,c.Wk,y.H],styles:[".auth[_ngcontent-%COMP%]{background-color:var(--primary-light-color);display:flex;width:100vw;height:100vh;justify-content:center;align-items:center}.content-wrapper[_ngcontent-%COMP%]{--content-wrapper-min-width: 400px;width:30%;min-width:var(--content-wrapper-min-width);background-color:var(--background-color);padding:var(--spacing-xl);border-radius:var(--border-radius-md)}.header-container[_ngcontent-%COMP%]{text-align:center}.header-title[_ngcontent-%COMP%]{--header-title-font-size: 40px;font-size:var(--header-title-font-size);color:var(--primary-color)}.header-subtitle[_ngcontent-%COMP%]{margin-top:var(--spacing-sm);margin-bottom:0;color:var(--primary-dark-color)}.form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:var(--spacing-md)}.form-control[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:var(--spacing-sm)}.form__label[_ngcontent-%COMP%]{font-weight:var(--font-weight-medium);color:var(--primary-dark-color)}.form__button[_ngcontent-%COMP%]{width:100%}.button__label[_ngcontent-%COMP%]{display:flex;justify-content:center;gap:var(--spacing-sm);font-size:var(--font-size-md)}.form__navigate[_ngcontent-%COMP%]{margin-top:var(--spacing-lg);text-align:center}.navigate__link[_ngcontent-%COMP%]{color:var(--primary-color);text-decoration:none}"],changeDetection:0})}return e})()}}]);