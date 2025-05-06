
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import { DakkapelRenderer } from './DakkapelRenderer';
import { DakkapelConfiguration } from './DakkapelCalculator';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface DimensionsSelectorProps {
  breedte: number;
  hoogte: number;
  onChange: (breedte: number, hoogte: number) => void;
  onNext: () => void;
  configuration: DakkapelConfiguration;
}

export function DimensionsSelector({ breedte, hoogte, onChange, onNext, configuration }: DimensionsSelectorProps) {
  const [showAdviceDialog, setShowAdviceDialog] = useState<"breedte" | "hoogte" | null>(null);
  
  // Limited width options as requested
  const breedteOptions = [200, 300, 400, 500];
  
  // Limited height options as requested
  const hoogteOptions = [150, 175];

  const handleValueChange = (type: "breedte" | "hoogte", value: string) => {
    if (value === "advies") {
      setShowAdviceDialog(type);
    } else {
      const parsedValue = parseInt(value);
      if (!isNaN(parsedValue)) {
        if (type === "breedte") {
          onChange(parsedValue, hoogte);
        } else {
          onChange(breedte, parsedValue);
        }
      }
    }
  };

  const handleAdviceAccept = (type: "breedte" | "hoogte", recommendation: number) => {
    if (type === "breedte") {
      onChange(recommendation, hoogte);
    } else {
      onChange(breedte, recommendation);
    }
    setShowAdviceDialog(null);
    toast.success(`We hebben ${type === "breedte" ? "breedte" : "hoogte"} aangepast naar ${recommendation} cm op basis van ons advies.`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Afmetingen van uw dakkapel</h2>
        <p className="mb-6 text-gray-600">
          Selecteer de gewenste afmetingen van uw dakkapel voor een nauwkeurige prijsindicatie.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="h-[300px] border-2 border-dashed border-gray-300 bg-gray-50">
            <DakkapelRenderer configuration={configuration} />
          </div>
          <div className="text-center text-sm text-gray-600 mt-2">
            3D visualisatie (draai met muis)
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="font-medium text-gray-800">Breedte dakkapel:</label>
              <span className="font-bold text-brand-darkGreen">{breedte} cm</span>
            </div>
            <div className="w-full">
              <Select
                value={breedte.toString()}
                onValueChange={(value) => handleValueChange("breedte", value)}
              >
                <SelectTrigger className="w-full bg-white text-black">
                  <SelectValue placeholder="Kies een optie..." />
                </SelectTrigger>
                <SelectContent className="bg-white text-black">
                  {breedteOptions.map((option) => (
                    <SelectItem key={option} value={option.toString()}>
                      {option} cm
                    </SelectItem>
                  ))}
                  <SelectItem value="advies">Weet ik niet, adviseer mij.</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="font-medium text-gray-800">Hoogte dakkapel:</label>
              <span className="font-bold text-brand-darkGreen">{hoogte} cm</span>
            </div>
            <div className="w-full">
              <Select
                value={hoogte.toString()}
                onValueChange={(value) => handleValueChange("hoogte", value)}
              >
                <SelectTrigger className="w-full bg-white text-black">
                  <SelectValue placeholder="Kies een optie..." />
                </SelectTrigger>
                <SelectContent className="bg-white text-black">
                  {hoogteOptions.map((option) => (
                    <SelectItem key={option} value={option.toString()}>
                      {option} cm
                    </SelectItem>
                  ))}
                  <SelectItem value="advies">Weet ik niet, adviseer mij.</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button onClick={onNext} className="bg-brand-lightGreen hover:bg-opacity-90">
          Volgende <MoveRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Dialogs for advice */}
      <Dialog open={showAdviceDialog === "breedte"} onOpenChange={(open) => !open && setShowAdviceDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Advies over breedte dakkapel</DialogTitle>
            <DialogDescription>
              Op basis van uw geselecteerde type dakkapel en gebruikelijke afmetingen, adviseren wij de volgende breedtes:
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <p className="text-sm">Voor dakkapel type {configuration.type} adviseren wij:</p>
            {configuration.type === 'typeA' && (
              <div className="space-y-2">
                <Button 
                  onClick={() => handleAdviceAccept("breedte", 125)} 
                  className="w-full bg-brand-lightGreen hover:bg-opacity-90"
                >
                  125 cm - Optimaal voor kleine ruimtes
                </Button>
              </div>
            )}
            {configuration.type === 'typeB' && (
              <div className="space-y-2">
                <Button 
                  onClick={() => handleAdviceAccept("breedte", 200)} 
                  className="w-full bg-brand-lightGreen hover:bg-opacity-90"
                >
                  200 cm - Standaard maat
                </Button>
                <Button 
                  onClick={() => handleAdviceAccept("breedte", 250)} 
                  className="w-full bg-brand-lightGreen hover:bg-opacity-90"
                >
                  250 cm - Ruimer formaat
                </Button>
              </div>
            )}
            {(configuration.type === 'typeC' || configuration.type === 'typeD' || configuration.type === 'typeE') && (
              <div className="space-y-2">
                <Button 
                  onClick={() => handleAdviceAccept("breedte", 400)} 
                  className="w-full bg-brand-lightGreen hover:bg-opacity-90"
                >
                  400 cm - Standaard breedte
                </Button>
                <Button 
                  onClick={() => handleAdviceAccept("breedte", 500)} 
                  className="w-full bg-brand-lightGreen hover:bg-opacity-90"
                >
                  500 cm - Maximale breedte
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showAdviceDialog === "hoogte"} onOpenChange={(open) => !open && setShowAdviceDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Advies over hoogte dakkapel</DialogTitle>
            <DialogDescription>
              Op basis van gebruikelijke afmetingen, adviseren wij de volgende hoogtes:
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Button 
                onClick={() => handleAdviceAccept("hoogte", 175)} 
                className="w-full bg-brand-lightGreen hover:bg-opacity-90"
              >
                175 cm - Standaard hoogte (aanbevolen)
              </Button>
              <Button 
                onClick={() => handleAdviceAccept("hoogte", 150)} 
                className="w-full bg-brand-lightGreen hover:bg-opacity-90"
              >
                150 cm - Compacte hoogte
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
