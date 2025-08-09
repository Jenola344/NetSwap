import type React from "react";

export const Ethereum = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.69231L12 12.5385L18.4615 9.15385L12 2.69231Z" fill="currentColor" fillOpacity="0.6"/>
    <path d="M12 2.69231L5.53846 9.15385L12 12.5385L12 2.69231Z" fill="currentColor"/>
    <path d="M12 14.1252L18.4615 10.7405L12 21.3079L12 14.1252Z" fill="currentColor" fillOpacity="0.6"/>
    <path d="M12 21.3079L5.53846 10.7405L12 14.1252L12 21.3079Z" fill="currentColor"/>
    <path d="M12 12.5385L18.4615 9.15385L12 5.76923L12 12.5385Z" fill="currentColor" fillOpacity="0.2"/>
    <path d="M5.53846 9.15385L12 12.5385L12 5.76923L5.53846 9.15385Z" fill="currentColor" fillOpacity="0.6"/>
  </svg>
);

export const Base = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 6V18" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 10L8 10" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const Celo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM16.4173 15.114C17.8236 13.0634 17.5451 10.3649 15.8205 8.64028C13.8993 6.71911 10.7486 6.54578 8.58268 8.16603C8.00196 8.58988 7.42125 9.01373 7.00018 9.58282C5.17637 11.9566 5.75709 15.352 7.94165 17.0766C9.96281 18.6968 12.9135 18.6968 14.9347 17.0766C15.5154 16.5975 16.0961 15.8284 16.4173 15.114Z" fill="#35D07F"/>
    <path d="M12.9134 7.20093C11.3929 6.07926 9.28187 6.37093 7.94152 7.71126C6.42104 9.23175 6.12937 11.5819 7.25104 13.1024C8.77152 14.6229 11.1217 14.9146 12.6422 13.7929C14.1627 12.6712 14.4544 10.3211 13.3327 8.79959" fill="#FBCC5C"/>
  </svg>
);

export const Usdc = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#2775CA"/>
    <path d="M12 17.5C15.0376 17.5 17.5 15.0376 17.5 12C17.5 8.96243 15.0376 6.5 12 6.5C8.96243 6.5 6.5 8.96243 6.5 12C6.5 15.0376 8.96243 17.5 12 17.5Z" fill="white"/>
    <path d="M13.2656 14.3359H12.0117C11.7148 14.3359 11.4648 14.2383 11.2617 14.043L10.2227 13.0039C10.0273 12.8086 9.92969 12.5664 9.92969 12.2773V11.7227C9.92969 11.4336 10.0273 11.1914 10.2227 10.9961L11.2617 9.95703C11.4648 9.76172 11.7148 9.66406 12.0117 9.66406H13.2656V11.1445H12.4336V12.8555H13.2656V14.3359ZM12.0117 8.57031C11.4883 8.57031 11.0234 8.74609 10.6172 9.09766L9.57812 10.1367C9.17188 10.543 8.96875 11.0547 8.96875 11.6719V12.3281C8.96875 12.9453 9.17188 13.457 9.57812 13.8633L10.6172 14.9023C11.0234 15.2539 11.4883 15.4297 12.0117 15.4297H14.2266V8.57031H12.0117Z" fill="#2775CA"/>
  </svg>
);

export const Usdt = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#26A17B"/>
        <path d="M11.5 17H13.5V7H11.5V17ZM9.5 9H15.5V7H9.5V9Z" fill="white"/>
    </svg>
);

export const Dai = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#F4B731"/>
        <path d="M12 6L7 12H17L12 6Z" fill="#4A4A4A"/>
        <path d="M7 13L12 18L17 13H7Z" fill="white"/>
    </svg>
);
