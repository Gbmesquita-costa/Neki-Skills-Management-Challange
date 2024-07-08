"use client";

import { Button } from "@/components/ui/button";
import { Loader, Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useUserSkills } from "./hooks";
import { Ratings } from "./ratings";

interface UserSkillsProps {
  id: string;
  user_id: string;
  skill_id: string;
  level: string;
  created_at: Date;
  updated_at: Date;
  skill: {
    id: string;
    name: string;
    imageUrl: string | null;
    description: string;
    created_at: Date;
    updated_at: Date;
  };
}

interface SkillsProps {
  id: string;
  name: string;
  imageUrl: string;
  description: string | null;
  created_at: Date;
  updated_at: Date;
}

interface UserSkills {
  userSkills: UserSkillsProps[];
  skills: SkillsProps[];
}

export const UserSkillsPainel = ({
  userSkills,
  skills,
}: UserSkills): JSX.Element => {
  const {
    handleDeleteSkill,
    handleUpdateLevelChange,
    handleAssociateSkill,
    handleLevelChange,
    handleSelectChange,
    updatingSkillId,
    isAssociateSkill,
    selectedSkillId,
    isSkillLevel,
    rating,
  } = useUserSkills({ skillId: skills[0]?.id });

  return (
    <div
      className="mb-7 grid grid-cols-1 sm:grid-cols-2 
      lg:grid-cols-3 gap-6 text-center"
    >
      {userSkills?.map((userSkill) => (
        <div
          key={userSkill.id}
          className="flex flex-col items-center justify-between 
          p-4 border rounded-md shadow-lg relative"
        >
          {updatingSkillId === userSkill.id && isSkillLevel && (
            <div className="animate-spin absolute right-3 top-3">
              <Loader />
            </div>
          )}

          <div className="flex flex-col items-center justify-center mb-4">
            <img
              src={userSkill.skill.imageUrl as string}
              alt={userSkill.skill.name}
              className="w-12 h-12 mb-4"
            />

            <h1 className="font-bold text-xl mb-4">{userSkill.skill.name}</h1>
            <p className="text-gray-600">{userSkill.skill.description}</p>
          </div>

          <div className="flex items-center justify-between w-full mt-4">
            <Ratings
              disabled={isSkillLevel}
              rating={parseInt(userSkill.level)}
              onRatingChange={(newRating) =>
                handleUpdateLevelChange(userSkill.id, newRating)
              }
            />

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant={"outline"} className="px-3 py-1">
                  <Trash2 size={18} />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Tem certeza que deseja deletar esta skill?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta ação não pode ser desfeita. Esta skill será removida
                    permanentemente da sua lista.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDeleteSkill(userSkill.id)}
                  >
                    Confirmar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      ))}

      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"} className="px-4 py-2 mt-4">
            Adicionar Skill
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar Skill</DialogTitle>
            <DialogDescription>
              Escolha as skills que mais tem a haver com o seu momento e defina
              o seu level
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4 w-full">
              <Select
                onValueChange={(value) => handleSelectChange(value)}
                value={selectedSkillId}
              >
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Selecione sua habilidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Skills Disponíveis</SelectLabel>
                    {skills.length ? (
                      skills?.map((skill) => (
                        <SelectItem key={skill.id} value={skill.id}>
                          {skill.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectLabel>Nenhuma skill disponível</SelectLabel>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Ratings
              rating={rating}
              onRatingChange={(newRating) => handleLevelChange(newRating)}
            />
            <div className="mt-4 w-full">
              <Button
                type="submit"
                className="w-full"
                disabled={isAssociateSkill || !skills.length}
                onClick={handleAssociateSkill}
              >
                {isAssociateSkill && (
                  <div className="mr-2 animate-spin">
                    <Loader />
                  </div>
                )}
                Adicionar Skill
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
