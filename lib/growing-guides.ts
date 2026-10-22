import bundle from '@shared/generated/website/guides.json';
export type Guide = {
  presentation: {template:string;category:string;accent:string;thumbnail?:string;calendarIntro?:string;hero:{src:string;alt:string;width:number;height:number}};
  slug: string; title: string; summary: string; scope: string; contentVersion: string;
  isDraft: boolean; sourceCheckedOn: string | null;
  quickFacts: {id:string;label:string;text:string}[];
  seasonalTasks: {id:string;label:string;months:number[];condition:string;text:string;environment:string;typeLabels:string[]}[];
  sections: {id:string;title:string;paragraphs:string[];typeLabels:string[]}[];
  sources: {title:string;url:string}[];
};
const content = bundle as {draftPreview:boolean; guides:Guide[]};
// Defence in depth: even a stale local bundle cannot supply a draft to static export.
export const guides = process.env.NODE_ENV === 'production'
  ? content.guides.filter(guide => !guide.isDraft)
  : content.guides;
