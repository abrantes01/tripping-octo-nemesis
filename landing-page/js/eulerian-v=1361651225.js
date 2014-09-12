/**
 *  Lot de fonctions intermedaires pour des appels vers EA
 *  Elles ont pour objectif de ne pas provoquer d'erreur js si l'appel se fait avant le chargement du js d'Eulerian et
 *  se rapellent automatiquement si c'est le cas
 */

// Lance un taggage de page EA
function addEACollector(o){
  var e,i,j;
  if(typeof EA_collector=="function"){
    if(typeof o!="object") o=['path',o];
    for(i in o){
      if(o[i]=='path'){
        version='';
        if(typeof VPG != 'undefined' && VPG.settings.tag_theme) {
          version+=VPG.settings.vp_theme;
        }
        if(version) version='/Version'+version;
        j=parseInt(i)+1;
        o[j]=o[j].replace('/%version',version);
      }
    }
    EA_collector(o);
  }else{
    setTimeout(function(){
      addEACollector(o);
    },500);
  }
}
function addEAButton(s){
   if(typeof EA_button=="function") EA_button(s);
   else{
     setTimeout(function(){
       addEAButton(s);
     },500);
   }
}
function addEAEvent(s){
  if(typeof EA_event=="function") EA_event(s);
  else{
    setTimeout(function(){
      addEAEvent(s);
    },500);
  }
}