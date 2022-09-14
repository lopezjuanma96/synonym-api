const a = '<h3>caminar</h3><ul><li>trotar,  galopar</li><li>apresurarse,  precipitarse,  acelerar,  volar,  aligerar</li><ul><li><span class="r">Antónimos: tardar,  parar,  retrasar</span></li></ul><li>deslizarse,  resbalar,  fluir,  manar</li><li>transcurrir,  pasar</li><li>propagarse,  divulgarse,  difundirse,  extenderse,  propalarse</li><ul><li><span class="r">Antónimos: silenciar</span></li></ul><li>perseguir,  acosar,  cazar,  amedrentar</li><li>recorrer,  visitar,  viajar,  transitar,  circular,  marchar,  caminar</li><li>apartarse,  moverse,  desplazarse</li><li>avergonzarse,  confundirse,  azorarse,  turbarse,  aturullarse,  desconcertarse,  abochornarse</li><br></ul>'

const synomMatch = a.matchAll(/(?<=<li>)(\w+(\,\s*)?)+(?=<\/li>)/ig)
const synomList = []
var eachSynom = synomMatch.next().value;
while(eachSynom){
    synomList.push(...eachSynom[0].split(/\,\s*/ig))
    eachSynom = synomMatch.next().value;
}

console.log(synomList)