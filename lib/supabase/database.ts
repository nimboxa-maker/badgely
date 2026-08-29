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

type StudyPlanTable = {
  Row: {
    certification_id: string;
    created_at: string;
    current_experience_level: string;
    generated_plan_text: string | null;
    id: string;
    include_labs: boolean;
    progress_percent: number;
    status: string;
    study_weeks: number;
    target_exam_date: string | null;
    updated_at: string;
    user_id: string;
    weekly_study_hours: number;
  };
  Insert: {
    certification_id: string;
    created_at?: string;
    current_experience_level?: string;
    generated_plan_text?: string | null;
    id?: string;
    include_labs?: boolean;
    progress_percent?: number;
    status?: string;
    study_weeks: number;
    target_exam_date?: string | null;
    updated_at?: string;
    user_id: string;
    weekly_study_hours: number;
  };
  Update: {
    certification_id?: string;
    created_at?: string;
    current_experience_level?: string;
    generated_plan_text?: string | null;
    id?: string;
    include_labs?: boolean;
    progress_percent?: number;
    status?: string;
    study_weeks?: number;
    target_exam_date?: string | null;
    updated_at?: string;
    user_id?: string;
    weekly_study_hours?: number;
  };
  Relationships: [
    {
      foreignKeyName: "user_study_plans_certification_id_fkey";
      columns: ["certification_id"];
      isOneToOne: false;
      referencedRelation: "certifications";
      referencedColumns: ["id"];
    },
  ];
};

type StudyTaskTable = {
  Row: {
    completed: boolean;
    completed_at: string | null;
    created_at: string;
    description: string | null;
    display_order: number;
    estimated_hours: number | null;
    id: string;
    task_type: string;
    title: string;
    updated_at: string;
    user_study_plan_id: string;
    week_number: number;
  };
  Insert: {
    completed?: boolean;
    completed_at?: string | null;
    created_at?: string;
    description?: string | null;
    display_order?: number;
    estimated_hours?: number | null;
    id?: string;
    task_type: string;
    title: string;
    updated_at?: string;
    user_study_plan_id: string;
    week_number: number;
  };
  Update: {
    completed?: boolean;
    completed_at?: string | null;
    created_at?: string;
    description?: string | null;
    display_order?: number;
    estimated_hours?: number | null;
    id?: string;
    task_type?: string;
    title?: string;
    updated_at?: string;
    user_study_plan_id?: string;
    week_number?: number;
  };
  Relationships: [
    {
      foreignKeyName: "study_tasks_user_study_plan_id_fkey";
      columns: ["user_study_plan_id"];
      isOneToOne: false;
      referencedRelation: "user_study_plans";
      referencedColumns: ["id"];
    },
  ];
};

export type Database = Omit<GeneratedDatabase, "public"> & {
  public: Omit<GeneratedDatabase["public"], "Tables"> & {
    Tables: GeneratedDatabase["public"]["Tables"] & {
      user_saved_certifications: SavedCertificationTable;
      user_saved_career_paths: SavedCareerPathTable;
      user_study_plans: StudyPlanTable;
      study_tasks: StudyTaskTable;
    };
  };
};
