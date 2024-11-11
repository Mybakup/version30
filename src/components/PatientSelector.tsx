import React from 'react';

interface PatientSelectorProps {
  forSelf: boolean;
  setForSelf: (value: boolean) => void;
  onAddBeneficiary: () => void;
}

export default function PatientSelector({ forSelf, setForSelf, onAddBeneficiary }: PatientSelectorProps) {
  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-[#47559E] mb-2">
          Choix du patient
        </h2>
        <p className="text-gray-600">
          Attention, les informations de santé que vous fournissez doivent être à jour.
        </p>
      </div>

      <div className="space-y-4">
        <label className="flex items-center gap-3">
          <input
            type="radio"
            checked={forSelf}
            onChange={() => setForSelf(true)}
            className="w-5 h-5 text-[#47559E]"
          />
          <span className="text-gray-900">Je prends rendez-vous pour moi</span>
        </label>

        <label className="flex items-center gap-3">
          <input
            type="radio"
            checked={!forSelf}
            onChange={() => {
              setForSelf(false);
              onAddBeneficiary();
            }}
            className="w-5 h-5 text-[#47559E]"
          />
          <span className="text-gray-900">J'ajoute un bénéficiaire</span>
        </label>
      </div>
    </div>
  );
}