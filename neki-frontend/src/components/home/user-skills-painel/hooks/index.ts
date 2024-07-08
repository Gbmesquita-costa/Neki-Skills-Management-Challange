import { useState } from "react";

import { getCookies } from "@/actions/cookies";
import { revalidateTagName } from "@/actions/revalidate";

import { validateLevelSchema } from "@/schemas/level-schema";
import { toastMapping } from "@/toasts/status-codes";

import { toast } from "sonner";

interface UserSkillsProps {
  skillId: string;
}

interface UserSkillResponse {
  message: string;
}

export function useUserSkills({ skillId }: UserSkillsProps) {
  const [rating, setRating] = useState<number>(1);
  const [selectedSkillId, setSelectedSkillId] = useState<string>(skillId);

  const [isSkillLevel, setIsSkillLevel] = useState<boolean>(false);
  const [updatingSkillId, setUpdatingSkillId] = useState<string>("");

  const [isAssociateSkill, setIsAssociateSkill] = useState<boolean>(false);

  const handleDeleteSkill = async (userSkillId: string) => {
    const token_access = await getCookies("token_access");
    const deleteUserSkill = `${process.env.NEXT_PUBLIC_HTTP_REQUEST}/skills/${userSkillId}`;

    try {
      const response = await fetch(deleteUserSkill, {
        credentials: "include",
        method: "DELETE",
        headers: {
          Authorization: `bearer ${token_access}`,
        },
      });

      const { message } = (await response.json()) as UserSkillResponse;

      if (response.ok) {
        await revalidateTagName("revalidate_userskill");
        toastMapping[response.status](message);
      } else {
        toastMapping[response.status](message);
      }
    } catch (error: any | undefined) {
      toast.error(error.message);
    }
  };

  const handleUpdateLevelChange = async (
    userSkillId: string,
    newLevel: number,
  ) => {
    setIsSkillLevel(true);
    setUpdatingSkillId(userSkillId);

    const token_access = await getCookies("token_access");
    const updateUserSkill = `${process.env.NEXT_PUBLIC_HTTP_REQUEST}/skills/${userSkillId}`;

    const levelValidation = validateLevelSchema.safeParse({
      level: newLevel,
    });

    if (levelValidation.error) {
      const formatError = levelValidation.error.flatten();
      return toast.warning(formatError.fieldErrors.level);
    }

    const { level } = levelValidation.data;

    try {
      const response = await fetch(updateUserSkill, {
        credentials: "include",
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token_access}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ level: String(level) }),
      });

      const { message } = (await response.json()) as UserSkillResponse;

      if (response.ok) {
        await revalidateTagName("revalidate_userskill");
        toastMapping[response.status](message);
      } else {
        toastMapping[response.status](message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSkillLevel(false);
    }
  };

  const handleAssociateSkill = async () => {
    setIsAssociateSkill(true);

    const token_access = await getCookies("token_access");
    const associatedSkill = `${process.env.NEXT_PUBLIC_HTTP_REQUEST}/associateSkills/${selectedSkillId}`;

    const levelValidation = validateLevelSchema.safeParse({
      level: rating,
    });

    if (levelValidation.error) {
      const formatError = levelValidation.error.flatten();
      return toast.warning(formatError.fieldErrors.level);
    }

    const { level } = levelValidation.data;

    try {
      const response = await fetch(associatedSkill, {
        credentials: "include",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token_access}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ level: String(level) }),
      });

      const { message } = (await response.json()) as UserSkillResponse;

      if (response.ok) {
        await revalidateTagName("revalidate_userskill");
        toastMapping[response.status](message);
      } else {
        toastMapping[response.status](message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsAssociateSkill(false);
    }
  };

  const handleLevelChange = (newLevel: number) => {
    setRating(newLevel);
  };

  const handleSelectChange = (newValue: string) => {
    setSelectedSkillId(newValue);
  };

  return {
    handleDeleteSkill,
    handleUpdateLevelChange,
    handleLevelChange,
    handleAssociateSkill,
    handleSelectChange,
    selectedSkillId,
    updatingSkillId,
    isAssociateSkill,
    isSkillLevel,
    rating,
  };
}
