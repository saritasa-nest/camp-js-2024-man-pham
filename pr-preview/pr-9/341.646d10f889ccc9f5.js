"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[341],{6166:(w,E,o)=>{o.d(E,{_:()=>Q});var e=o(7788),S=o(7222),k=o(1392),g=o(2221),p=o(6104),A=o(6610),_=o(194),b=o(6810),B=o(1857),u=o(1992),c=o(814),l=o(590),m=o(6340);function d(s,y){if(1&s){const t=e.RV6();e.j41(0,"div",1)(1,"button",2),e.bIt("click",function(){e.eBV(t);const a=e.XpG();return e.Njj(a.action())}),e.EFF(2),e.k0s()()}if(2&s){const t=e.XpG();e.R7$(2),e.SpI(" ",t.data.action," ")}}const f=["label"];function v(s,y){}const R=Math.pow(2,31)-1;class D{constructor(y,t){this._overlayRef=t,this._afterDismissed=new p.B,this._afterOpened=new p.B,this._onAction=new p.B,this._dismissedByAction=!1,this.containerInstance=y,y._onExit.subscribe(()=>this._finishDismiss())}dismiss(){this._afterDismissed.closed||this.containerInstance.exit(),clearTimeout(this._durationTimeoutId)}dismissWithAction(){this._onAction.closed||(this._dismissedByAction=!0,this._onAction.next(),this._onAction.complete(),this.dismiss()),clearTimeout(this._durationTimeoutId)}closeWithAction(){this.dismissWithAction()}_dismissAfter(y){this._durationTimeoutId=setTimeout(()=>this.dismiss(),Math.min(y,R))}_open(){this._afterOpened.closed||(this._afterOpened.next(),this._afterOpened.complete())}_finishDismiss(){this._overlayRef.dispose(),this._onAction.closed||this._onAction.complete(),this._afterDismissed.next({dismissedByAction:this._dismissedByAction}),this._afterDismissed.complete(),this._dismissedByAction=!1}afterDismissed(){return this._afterDismissed}afterOpened(){return this.containerInstance._onEnter}onAction(){return this._onAction}}const O=new e.nKC("MatSnackBarData");class C{constructor(){this.politeness="assertive",this.announcementMessage="",this.duration=0,this.data=null,this.horizontalPosition="center",this.verticalPosition="bottom"}}let P=(()=>{class s{static#t=this.\u0275fac=function(n){return new(n||s)};static#e=this.\u0275dir=e.FsC({type:s,selectors:[["","matSnackBarLabel",""]],hostAttrs:[1,"mat-mdc-snack-bar-label","mdc-snackbar__label"],standalone:!0})}return s})(),I=(()=>{class s{static#t=this.\u0275fac=function(n){return new(n||s)};static#e=this.\u0275dir=e.FsC({type:s,selectors:[["","matSnackBarActions",""]],hostAttrs:[1,"mat-mdc-snack-bar-actions","mdc-snackbar__actions"],standalone:!0})}return s})(),T=(()=>{class s{static#t=this.\u0275fac=function(n){return new(n||s)};static#e=this.\u0275dir=e.FsC({type:s,selectors:[["","matSnackBarAction",""]],hostAttrs:[1,"mat-mdc-snack-bar-action","mdc-snackbar__action"],standalone:!0})}return s})(),L=(()=>{class s{constructor(t,n){this.snackBarRef=t,this.data=n}action(){this.snackBarRef.dismissWithAction()}get hasAction(){return!!this.data.action}static#t=this.\u0275fac=function(n){return new(n||s)(e.rXU(D),e.rXU(O))};static#e=this.\u0275cmp=e.VBU({type:s,selectors:[["simple-snack-bar"]],hostAttrs:[1,"mat-mdc-simple-snack-bar"],exportAs:["matSnackBar"],standalone:!0,features:[e.aNF],decls:3,vars:2,consts:[["matSnackBarLabel",""],["matSnackBarActions",""],["mat-button","","matSnackBarAction","",3,"click"]],template:function(n,a){1&n&&(e.j41(0,"div",0),e.EFF(1),e.k0s(),e.DNE(2,d,3,1,"div",1)),2&n&&(e.R7$(),e.SpI(" ",a.data.message,"\n"),e.R7$(),e.vxM(a.hasAction?2:-1))},dependencies:[g.$z,P,I,T],styles:[".mat-mdc-simple-snack-bar{display:flex}"],encapsulation:2,changeDetection:0})}return s})();const U={snackBarState:(0,_.hZ)("state",[(0,_.wk)("void, hidden",(0,_.iF)({transform:"scale(0.8)",opacity:0})),(0,_.wk)("visible",(0,_.iF)({transform:"scale(1)",opacity:1})),(0,_.kY)("* => visible",(0,_.i0)("150ms cubic-bezier(0, 0, 0.2, 1)")),(0,_.kY)("* => void, * => hidden",(0,_.i0)("75ms cubic-bezier(0.4, 0.0, 1, 1)",(0,_.iF)({opacity:0})))])};let K=0,F=(()=>{class s extends b.lb{constructor(t,n,a,i,r){super(),this._ngZone=t,this._elementRef=n,this._changeDetectorRef=a,this._platform=i,this.snackBarConfig=r,this._document=(0,e.WQX)(A.qQ),this._trackedModals=new Set,this._announceDelay=150,this._destroyed=!1,this._onAnnounce=new p.B,this._onExit=new p.B,this._onEnter=new p.B,this._animationState="void",this._liveElementId="mat-snack-bar-container-live-"+K++,this.attachDomPortal=h=>{this._assertNotAttached();const M=this._portalOutlet.attachDomPortal(h);return this._afterPortalAttached(),M},this._live="assertive"!==r.politeness||r.announcementMessage?"off"===r.politeness?"off":"polite":"assertive",this._platform.FIREFOX&&("polite"===this._live&&(this._role="status"),"assertive"===this._live&&(this._role="alert"))}attachComponentPortal(t){this._assertNotAttached();const n=this._portalOutlet.attachComponentPortal(t);return this._afterPortalAttached(),n}attachTemplatePortal(t){this._assertNotAttached();const n=this._portalOutlet.attachTemplatePortal(t);return this._afterPortalAttached(),n}onAnimationEnd(t){const{fromState:n,toState:a}=t;if(("void"===a&&"void"!==n||"hidden"===a)&&this._completeExit(),"visible"===a){const i=this._onEnter;this._ngZone.run(()=>{i.next(),i.complete()})}}enter(){this._destroyed||(this._animationState="visible",this._changeDetectorRef.markForCheck(),this._changeDetectorRef.detectChanges(),this._screenReaderAnnounce())}exit(){return this._ngZone.run(()=>{this._animationState="hidden",this._changeDetectorRef.markForCheck(),this._elementRef.nativeElement.setAttribute("mat-exit",""),clearTimeout(this._announceTimeoutId)}),this._onExit}ngOnDestroy(){this._destroyed=!0,this._clearFromModals(),this._completeExit()}_completeExit(){queueMicrotask(()=>{this._onExit.next(),this._onExit.complete()})}_afterPortalAttached(){const t=this._elementRef.nativeElement,n=this.snackBarConfig.panelClass;n&&(Array.isArray(n)?n.forEach(r=>t.classList.add(r)):t.classList.add(n)),this._exposeToModals();const a=this._label.nativeElement,i="mdc-snackbar__label";a.classList.toggle(i,!a.querySelector(`.${i}`))}_exposeToModals(){const t=this._liveElementId,n=this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');for(let a=0;a<n.length;a++){const i=n[a],r=i.getAttribute("aria-owns");this._trackedModals.add(i),r?-1===r.indexOf(t)&&i.setAttribute("aria-owns",r+" "+t):i.setAttribute("aria-owns",t)}}_clearFromModals(){this._trackedModals.forEach(t=>{const n=t.getAttribute("aria-owns");if(n){const a=n.replace(this._liveElementId,"").trim();a.length>0?t.setAttribute("aria-owns",a):t.removeAttribute("aria-owns")}}),this._trackedModals.clear()}_assertNotAttached(){this._portalOutlet.hasAttached()}_screenReaderAnnounce(){this._announceTimeoutId||this._ngZone.runOutsideAngular(()=>{this._announceTimeoutId=setTimeout(()=>{const t=this._elementRef.nativeElement.querySelector("[aria-hidden]"),n=this._elementRef.nativeElement.querySelector("[aria-live]");if(t&&n){let a=null;this._platform.isBrowser&&document.activeElement instanceof HTMLElement&&t.contains(document.activeElement)&&(a=document.activeElement),t.removeAttribute("aria-hidden"),n.appendChild(t),a?.focus(),this._onAnnounce.next(),this._onAnnounce.complete()}},this._announceDelay)})}static#t=this.\u0275fac=function(n){return new(n||s)(e.rXU(e.SKi),e.rXU(e.aKT),e.rXU(e.gRc),e.rXU(B.OD),e.rXU(C))};static#e=this.\u0275cmp=e.VBU({type:s,selectors:[["mat-snack-bar-container"]],viewQuery:function(n,a){if(1&n&&(e.GBs(b.I3,7),e.GBs(f,7)),2&n){let i;e.mGM(i=e.lsd())&&(a._portalOutlet=i.first),e.mGM(i=e.lsd())&&(a._label=i.first)}},hostAttrs:[1,"mdc-snackbar","mat-mdc-snack-bar-container"],hostVars:1,hostBindings:function(n,a){1&n&&e.Kam("@state.done",function(r){return a.onAnimationEnd(r)}),2&n&&e.zvX("@state",a._animationState)},standalone:!0,features:[e.Vt3,e.aNF],decls:6,vars:3,consts:[["label",""],[1,"mdc-snackbar__surface","mat-mdc-snackbar-surface"],[1,"mat-mdc-snack-bar-label"],["aria-hidden","true"],["cdkPortalOutlet",""]],template:function(n,a){1&n&&(e.j41(0,"div",1)(1,"div",2,0)(3,"div",3),e.DNE(4,v,0,0,"ng-template",4),e.k0s(),e.nrm(5,"div"),e.k0s()()),2&n&&(e.R7$(5),e.BMQ("aria-live",a._live)("role",a._role)("id",a._liveElementId))},dependencies:[b.I3],styles:[".mat-mdc-snack-bar-container{display:flex;align-items:center;justify-content:center;box-sizing:border-box;-webkit-tap-highlight-color:rgba(0,0,0,0);margin:8px}.mat-mdc-snack-bar-handset .mat-mdc-snack-bar-container{width:100vw}.mat-mdc-snackbar-surface{box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);display:flex;align-items:center;justify-content:flex-start;box-sizing:border-box;padding-left:0;padding-right:8px}[dir=rtl] .mat-mdc-snackbar-surface{padding-right:0;padding-left:8px}.mat-mdc-snack-bar-container .mat-mdc-snackbar-surface{min-width:344px;max-width:672px}.mat-mdc-snack-bar-handset .mat-mdc-snackbar-surface{width:100%;min-width:0}.cdk-high-contrast-active .mat-mdc-snackbar-surface{outline:solid 1px}.mat-mdc-snack-bar-container .mat-mdc-snackbar-surface{color:var(--mdc-snackbar-supporting-text-color);border-radius:var(--mdc-snackbar-container-shape);background-color:var(--mdc-snackbar-container-color)}.mdc-snackbar__label{width:100%;flex-grow:1;box-sizing:border-box;margin:0;padding:14px 8px 14px 16px}[dir=rtl] .mdc-snackbar__label{padding-left:8px;padding-right:16px}.mat-mdc-snack-bar-container .mdc-snackbar__label{font-family:var(--mdc-snackbar-supporting-text-font);font-size:var(--mdc-snackbar-supporting-text-size);font-weight:var(--mdc-snackbar-supporting-text-weight);line-height:var(--mdc-snackbar-supporting-text-line-height)}.mat-mdc-snack-bar-actions{display:flex;flex-shrink:0;align-items:center;box-sizing:border-box}.mat-mdc-snack-bar-handset,.mat-mdc-snack-bar-container,.mat-mdc-snack-bar-label{flex:1 1 auto}.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled){color:var(--mat-snack-bar-button-color);--mat-text-button-state-layer-color:currentColor;--mat-text-button-ripple-color:currentColor}.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) .mat-ripple-element{opacity:.1}"],encapsulation:2,data:{animation:[U.snackBarState]}})}return s})();const z=new e.nKC("mat-snack-bar-default-options",{providedIn:"root",factory:function W(){return new C}});let V=(()=>{class s{get _openedSnackBarRef(){const t=this._parentSnackBar;return t?t._openedSnackBarRef:this._snackBarRefAtThisLevel}set _openedSnackBarRef(t){this._parentSnackBar?this._parentSnackBar._openedSnackBarRef=t:this._snackBarRefAtThisLevel=t}constructor(t,n,a,i,r,h){this._overlay=t,this._live=n,this._injector=a,this._breakpointObserver=i,this._parentSnackBar=r,this._defaultConfig=h,this._snackBarRefAtThisLevel=null,this.simpleSnackBarComponent=L,this.snackBarContainerComponent=F,this.handsetCssClass="mat-mdc-snack-bar-handset"}openFromComponent(t,n){return this._attach(t,n)}openFromTemplate(t,n){return this._attach(t,n)}open(t,n="",a){const i={...this._defaultConfig,...a};return i.data={message:t,action:n},i.announcementMessage===t&&(i.announcementMessage=void 0),this.openFromComponent(this.simpleSnackBarComponent,i)}dismiss(){this._openedSnackBarRef&&this._openedSnackBarRef.dismiss()}ngOnDestroy(){this._snackBarRefAtThisLevel&&this._snackBarRefAtThisLevel.dismiss()}_attachSnackBarContainer(t,n){const i=e.zZn.create({parent:n&&n.viewContainerRef&&n.viewContainerRef.injector||this._injector,providers:[{provide:C,useValue:n}]}),r=new b.A8(this.snackBarContainerComponent,n.viewContainerRef,i),h=t.attach(r);return h.instance.snackBarConfig=n,h.instance}_attach(t,n){const a={...new C,...this._defaultConfig,...n},i=this._createOverlay(a),r=this._attachSnackBarContainer(i,a),h=new D(r,i);if(t instanceof e.C4Q){const M=new b.VA(t,null,{$implicit:a.data,snackBarRef:h});h.instance=r.attachTemplatePortal(M)}else{const M=this._createInjector(a,h),$=new b.A8(t,void 0,M),H=r.attachComponentPortal($);h.instance=H.instance}return this._breakpointObserver.observe(c.Rp.HandsetPortrait).pipe((0,m.Q)(i.detachments())).subscribe(M=>{i.overlayElement.classList.toggle(this.handsetCssClass,M.matches)}),a.announcementMessage&&r._onAnnounce.subscribe(()=>{this._live.announce(a.announcementMessage,a.politeness)}),this._animateSnackBar(h,a),this._openedSnackBarRef=h,this._openedSnackBarRef}_animateSnackBar(t,n){t.afterDismissed().subscribe(()=>{this._openedSnackBarRef==t&&(this._openedSnackBarRef=null),n.announcementMessage&&this._live.clear()}),this._openedSnackBarRef?(this._openedSnackBarRef.afterDismissed().subscribe(()=>{t.containerInstance.enter()}),this._openedSnackBarRef.dismiss()):t.containerInstance.enter(),n.duration&&n.duration>0&&t.afterOpened().subscribe(()=>t._dismissAfter(n.duration))}_createOverlay(t){const n=new l.rR;n.direction=t.direction;let a=this._overlay.position().global();const i="rtl"===t.direction,r="left"===t.horizontalPosition||"start"===t.horizontalPosition&&!i||"end"===t.horizontalPosition&&i,h=!r&&"center"!==t.horizontalPosition;return r?a.left("0"):h?a.right("0"):a.centerHorizontally(),"top"===t.verticalPosition?a.top("0"):a.bottom("0"),n.positionStrategy=a,this._overlay.create(n)}_createInjector(t,n){return e.zZn.create({parent:t&&t.viewContainerRef&&t.viewContainerRef.injector||this._injector,providers:[{provide:D,useValue:n},{provide:O,useValue:t.data}]})}static#t=this.\u0275fac=function(n){return new(n||s)(e.KVO(l.hJ),e.KVO(u.Ai),e.KVO(e.zZn),e.KVO(c.QP),e.KVO(s,12),e.KVO(z))};static#e=this.\u0275prov=e.jDH({token:s,factory:s.\u0275fac,providedIn:"root"})}return s})();let X=(()=>{class s{constructor(){this.snackBar=(0,e.WQX)(V)}showMessage(t){this.snackBar.open(t,"Close",{duration:5e3,verticalPosition:"top"})}static#t=this.\u0275fac=function(n){return new(n||s)};static#e=this.\u0275prov=e.jDH({token:s,factory:s.\u0275fac,providedIn:"root"})}return s})();const x={default:"Something went wrong. Please try again later.",required:"This field is required.",email:"Enter a valid email address.",minlength:"Below the minimum length required for this field.",maxlength:"Exceeds the maximum length of this field.",mustMatch:"Password does not match."};let Q=(()=>{class s{constructor(){this.notificationService=(0,e.WQX)(X)}handleResponseError(t,n){n instanceof k.Q&&this.displayResponseError(t,n)}getErrors(t){const n={...t.errors,...t.parent?.errors};return n?Object.keys(n).map(a=>this.getErrorMessage(a)).join(" "):""}clearErrors(t,n){if(n){const a=this.findFieldControl(t,n);a&&a.setErrors(null)}else t.updateValueAndValidity()}displayResponseError(t,n){0!==n.errors.length?n.errors.forEach(a=>{const i=a.attr,r=a.detail;i?null!=t&&this.hasFieldName(t,i)?this.setFieldError(t,i,r):this.notificationService.showMessage(`Error: ${i} ${r}`):this.notificationService.showMessage(r??x.default)}):this.notificationService.showMessage(x.default)}getErrorMessage(t){return x[t]||t}findFieldControl(t,n){let a=t.get(n);return a||Object.keys(t.controls).forEach(i=>{const r=t.get(i);if(r instanceof S.gE){const h=this.findFieldControl(r,n);h&&(a=h)}}),a}setFieldError(t,n,a){const i=this.findFieldControl(t,n),r={...i?.errors,[a]:!0};i?.setErrors(r)}hasFieldName(t,n){return null!=this.findFieldControl(t,n)}static#t=this.\u0275fac=function(n){return new(n||s)};static#e=this.\u0275prov=e.jDH({token:s,factory:s.\u0275fac,providedIn:"root"})}return s})()},341:(w,E,o)=>{o.d(E,{H:()=>u});var e=o(7788),S=o(7212),k=o(7222),g=o(2221),p=o(9344),A=o(6182),_=o(4587),b=o(6166),B=o(7236);let u=(()=>{class c{constructor(){this.control=new k.MJ,this.touched=!1,this.placeholder="Enter your password",this.id="",this.formErrorService=(0,e.WQX)(b._),this.hidePassword=(0,e.vPA)(!0),this.changeDetector=(0,e.WQX)(e.gRc),this.destroyRef=(0,e.WQX)(e.abz)}ngOnInit(){this.control.statusChanges.pipe((0,B.M)(()=>{this.changeDetector.markForCheck()}),(0,S.pQ)(this.destroyRef)).subscribe()}handleClickHidePasswordButton(m){this.hidePassword.update(d=>!d),m.stopPropagation()}static#t=this.\u0275fac=function(d){return new(d||c)};static#e=this.\u0275cmp=e.VBU({type:c,selectors:[["camp-password-input"]],inputs:{control:"control",touched:"touched",placeholder:"placeholder",id:"id"},standalone:!0,features:[e.aNF],decls:10,vars:6,consts:[["subscriptSizing","dynamic","appearance","outline",1,"form-field"],["matIconPrefix",""],["matInput","",3,"id","type","placeholder","formControl"],["mat-icon-button","","matSuffix","","type","button",3,"click"]],template:function(d,f){1&d&&(e.j41(0,"mat-form-field",0)(1,"mat-icon",1),e.EFF(2,"lock"),e.k0s(),e.nrm(3,"input",2),e.j41(4,"button",3),e.bIt("click",function(R){return f.handleClickHidePasswordButton(R)}),e.j41(5,"mat-icon"),e.EFF(6),e.k0s()(),e.j41(7,"mat-error")(8,"span"),e.EFF(9),e.k0s()()()),2&d&&(e.R7$(3),e.Y8G("id",f.id)("type",f.hidePassword()?"password":"text")("placeholder",f.placeholder)("formControl",f.control),e.R7$(3),e.JRh(f.hidePassword()?"visibility_off":"visibility"),e.R7$(3),e.JRh(f.formErrorService.getErrors(f.control)))},dependencies:[p.RG,p.rl,p.TL,p.JW,p.yw,_.fS,_.fg,A.m_,A.An,g.Hl,g.iY,k.X1,k.me,k.BC,k.l_],styles:[".form-field[_ngcontent-%COMP%]{width:100%}"],changeDetection:0})}return c})()},7212:(w,E,o)=>{o.d(E,{pQ:()=>g});var e=o(7788),S=o(9406),k=o(6340);function g(u){u||((0,e.Af3)(g),u=(0,e.WQX)(e.abz));const c=new S.c(l=>u.onDestroy(l.next.bind(l)));return l=>l.pipe((0,k.Q)(c))}}}]);