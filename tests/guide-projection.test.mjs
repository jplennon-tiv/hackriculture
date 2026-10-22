import assert from 'node:assert/strict';
import test from 'node:test';
import { projectGuide } from '../lib/guide-projection.mjs';
const fixture = () => ({
  schemaVersion:'0.1.0',contentVersion:'test',sourceKey:'carrot',slug:'carrots',title:'Carrots',summary:'Fixture',scope:'Outdoor roots',status:'draft',completeness:'page-draft',
  review:{sourceCheckedOn:null,approvedBy:null,approvedOn:null},types:[{id:'maincrop',label:'Maincrop',description:'Fixture'}],
  quickFacts:[{id:'spacing',label:'Spacing',range:[5,7.5],unit:'cm',sourceIds:['source']}],
  seasonalTasks:[{id:'store',action:'check-storage',months:[11,12,1,2],environment:'storage',typeIds:['maincrop'],condition:'Only if a stored crop exists.',text:'Inspect.',sourceIds:['source']}],
  sections:[{id:'sow',title:'Sow',paragraphs:['Fixture copy.'],sourceIds:['source']}],
  personalNotes:[],media:{shortVideo:null,relatedVideos:[]},sources:[{id:'source',kind:'web',url:'https://example.com/guide',title:'Test source',checkedOn:'2026-09-09'}],
  editorialDecisions:[{private:'DO NOT EXPORT'}],referenceSnapshot:'private-reference',
});
test('drafts require explicit preview and incomplete examples are rejected', () => {
  assert.throws(() => projectGuide(fixture()), /Unapproved/);
  assert.equal(projectGuide(fixture(),{allowDrafts:true}).isDraft,true);
  const incomplete=fixture(); incomplete.completeness='structural-example';
  assert.throws(() => projectGuide(incomplete,{allowDrafts:true}));
  const unapproved=fixture(); unapproved.status='approved';
  assert.throws(() => projectGuide(unapproved), /Unapproved/);
});
test('public projection requires approval and strips internal source and editorial metadata', () => {
  const c=fixture();c.status='approved';c.review.approvedBy='Test reviewer';c.review.approvedOn='2026-09-09';
  const out=projectGuide(c);
  assert.equal(out.isDraft,false);
  assert(!JSON.stringify(out).includes('DO NOT EXPORT'));
  assert(!JSON.stringify(out).includes('private-reference'));
  assert.equal(out.quickFacts[0].text,'5–7.5 cm');
});
test('year-crossing tasks retain stage conditions and crop type labels', () => {
  const task=projectGuide(fixture(),{allowDrafts:true}).seasonalTasks[0];
  assert.deepEqual(task.months,[11,12,1,2]);
  assert.equal(task.condition,'Only if a stored crop exists.');
  assert.deepEqual(task.typeLabels,['Maincrop']);
});
test('invalid facts, calendar values and source/type links fail instead of producing misleading advice', () => {
  for(const change of [
    c=>c.quickFacts[0].range=[7.5,5], c=>delete c.quickFacts[0].unit,
    c=>c.quickFacts[0].text='Conflicting value', c=>c.sections[0].sourceIds=['missing'],
    c=>c.seasonalTasks[0].months=[13], c=>c.seasonalTasks[0].condition='',
    c=>c.seasonalTasks[0].typeIds=['climbing'], c=>c.seasonalTasks[0].months=[1,1],
  ]) {const c=fixture(); change(c); assert.throws(()=>projectGuide(c,{allowDrafts:true}));}
});

test('shared facts reflect master edits, preserve metric wording, and forbid stale fallbacks', () => {
  const c = fixture();
  c.quickFacts = [{id:'depth', label:'Sowing depth', masterPath:'sowing_and_planting.sowing_depth', sourceIds:['source']}];
  const masterRecord = {sowing_and_planting:{sowing_depth:{metric:'1.3 cm',imperial:'1/2 in.'}}};
  const render = () => projectGuide(c,{allowDrafts:true,masterRecord});
  assert.equal(render().quickFacts[0].text,'1.3 cm');
  masterRecord.sowing_and_planting.sowing_depth.metric = '2 cm';
  assert.equal(render().quickFacts[0].text,'2 cm');
  assert.deepEqual(render().sections[0].paragraphs,c.sections[0].paragraphs);
  c.quickFacts[0].text = 'Old independent value';
  assert.throws(render,/must not keep a local value/);
  delete c.quickFacts[0].text;
  masterRecord.sowing_and_planting.sowing_depth.metric = null;
  assert.throws(render,/Missing metric master fact/);
});
