import type { Database as GeneratedDatabase } from "@/lib/supabase/database.types";

type SavedCertificationTable = {
  Row: {
    certification_id: string;
    id: string;
    personal_notes: string | null;
    saved_at: string;
    status: string;
    target_exam_date: string | null;
    updated_at: string;
    user_id: string;
  };
  Insert: {
    certification_id: string;
    id?: string;
    personal_notes?: string | null;
    saved_at?: string;
    status?: string;
    target_exam_date?: string | null;
    updated_at?: string;
    user_id: string;
  };
  Update: {
    certification_id?: string;
    id?: string;
    personal_notes?: string | null;
    saved_at?: string;
    status?: string;
    target_exam_date?: string | null;
    updated_at?: string;
    user_id?: string;
  };
  Relationships: [
    {
      foreignKeyName: "user_saved_certifications_certification_id_fkey";
      columns: ["certification_id"];
      isOneToOne: false;
      referencedRelation: "certifications";
      referencedColumns: ["id"];
    },
  ];
};

type SavedCareerPathTable = {
  Row: {
    career_path_id: string;
    id: string;
    saved_at: string;
    user_id: string;
  };
  Insert: {
    career_path_id: string;
    id?: string;
    saved_at?: string;
    user_id: string;
  };
  Update: {
    career_path_id?: string;
    id?: string;
    saved_at?: string;
    user_id?: string;
  };
  Relationships: [
    {
      foreignKeyName: "user_saved_career_paths_career_path_id_fkey";
      columns: ["career_path_id"];
      isOneToOne: false;
      referencedRelation: "career_paths";
      referencedColumns: ["id"];
    },
  ];
};

export type Database = Omit<GeneratedDatabase, "public"> & {
  public: Omit<GeneratedDatabase["public"], "Tables"> & {
    Tables: GeneratedDatabase["public"]["Tables"] & {
      user_saved_certifications: SavedCertificationTable;
      user_saved_career_paths: SavedCareerPathTable;
    };
  };
};
