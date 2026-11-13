"use client";

import Image from "next/image";
import { useState } from "react";

export type PhotoStep = { title: string; text: string; image: string };

type Props = {
  tabs: { label: string; steps: PhotoStep[] }[];
};

export function PhotoSteps({ steps }: { steps: PhotoStep[] }) {
  return (
    <ol className="photo-steps">
      {steps.map((step) => (
        <li key={step.title} className="photo-step">
          <Image src={step.image} alt="" width={584} height={440} />
          <div>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

// "How it works" with a switch between the freelancer's and the business's steps.
export function HowTabs({ tabs }: Props) {
  const [active, setActive] = useState(0);

  return (
    <>
      <div className="tabs" role="tablist">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            type="button"
            role="tab"
            className="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" style={{ marginTop: 20 }}>
        <PhotoSteps steps={tabs[active].steps} />
      </div>
    </>
  );
}
