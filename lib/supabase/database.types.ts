export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.17"
  }
  public: {
    Tables: {
      career_path_steps: {
        Row: {
          career_path_id: string
          certification_id: string | null
          display_order: number
          explanation: string | null
          id: string
          is_optional: boolean
          practical_activity: string | null
          step_number: number
          title: string
        }
        Insert: {
          career_path_id: string
          certification_id?: string | null
          display_order?: number
          explanation?: string | null
          id?: string
          is_optional?: boolean
          practical_activity?: string | null
          step_number: number
          title: string
        }
        Update: {
          career_path_id?: string
          certification_id?: string | null
          display_order?: number
          explanation?: string | null
          id?: string
          is_optional?: boolean
          practical_activity?: string | null
          step_number?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "career_path_steps_career_path_id_fkey"
            columns: ["career_path_id"]
            isOneToOne: false
            referencedRelation: "career_paths"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "career_path_steps_certification_id_fkey"
            columns: ["certification_id"]
            isOneToOne: false
            referencedRelation: "certifications"
            referencedColumns: ["id"]
          },
        ]
      }
      career_paths: {
        Row: {
          audience_level: string | null
          created_at: string
          estimated_total_time_text: string | null
          featured: boolean
          full_summary: string | null
          id: string
          name: string
          seo_description: string | null
          seo_title: string | null
          short_summary: string
          slug: string
          target_role: string | null
          updated_at: string
        }
        Insert: {
          audience_level?: string | null
          created_at?: string
          estimated_total_time_text?: string | null
          featured?: boolean
          full_summary?: string | null
          id?: string
          name: string
          seo_description?: string | null
          seo_title?: string | null
          short_summary: string
          slug: string
          target_role?: string | null
          updated_at?: string
        }
        Update: {
          audience_level?: string | null
          created_at?: string
          estimated_total_time_text?: string | null
          featured?: boolean
          full_summary?: string | null
          id?: string
          name?: string
          seo_description?: string | null
          seo_title?: string | null
          short_summary?: string
          slug?: string
          target_role?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      certification_relations: {
        Row: {
          explanation: string | null
          id: string
          relation_type: string
          source_certification_id: string
          target_certification_id: string
        }
        Insert: {
          explanation?: string | null
          id?: string
          relation_type: string
          source_certification_id: string
          target_certification_id: string
        }
        Update: {
          explanation?: string | null
          id?: string
          relation_type?: string
          source_certification_id?: string
          target_certification_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "certification_relations_source_certification_id_fkey"
            columns: ["source_certification_id"]
            isOneToOne: false
            referencedRelation: "certifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certification_relations_target_certification_id_fkey"
            columns: ["target_certification_id"]
            isOneToOne: false
            referencedRelation: "certifications"
            referencedColumns: ["id"]
          },
        ]
      }
      certifications: {
        Row: {
          category: string
          created_at: string
          estimated_study_hours_max: number | null
          estimated_study_hours_min: number | null
          featured: boolean
          full_summary: string | null
          id: string
          last_verified_date: string | null
          level: string
          name: string
          official_certification_url: string | null
          provider_id: string
          recommended_experience: string | null
          seo_description: string | null
          seo_title: string | null
          short_summary: string
          slug: string
          status: string
          target_job_roles: string[]
          updated_at: string
          vendor_type: string
        }
        Insert: {
          category: string
          created_at?: string
          estimated_study_hours_max?: number | null
          estimated_study_hours_min?: number | null
          featured?: boolean
          full_summary?: string | null
          id?: string
          last_verified_date?: string | null
          level: string
          name: string
          official_certification_url?: string | null
          provider_id: string
          recommended_experience?: string | null
          seo_description?: string | null
          seo_title?: string | null
          short_summary: string
          slug: string
          status?: string
          target_job_roles?: string[]
          updated_at?: string
          vendor_type: string
        }
        Update: {
          category?: string
          created_at?: string
          estimated_study_hours_max?: number | null
          estimated_study_hours_min?: number | null
          featured?: boolean
          full_summary?: string | null
          id?: string
          last_verified_date?: string | null
          level?: string
          name?: string
          official_certification_url?: string | null
          provider_id?: string
          recommended_experience?: string | null
          seo_description?: string | null
          seo_title?: string | null
          short_summary?: string
          slug?: string
          status?: string
          target_job_roles?: string[]
          updated_at?: string
          vendor_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "certifications_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      exam_domains: {
        Row: {
          certification_id: string
          description: string | null
          display_order: number
          domain_name: string
          domain_weight_text: string | null
          id: string
        }
        Insert: {
          certification_id: string
          description?: string | null
          display_order?: number
          domain_name: string
          domain_weight_text?: string | null
          id?: string
        }
        Update: {
          certification_id?: string
          description?: string | null
          display_order?: number
          domain_name?: string
          domain_weight_text?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "exam_domains_certification_id_fkey"
            columns: ["certification_id"]
            isOneToOne: false
            referencedRelation: "certifications"
            referencedColumns: ["id"]
          },
        ]
      }
      exams: {
        Row: {
          certification_id: string
          created_at: string
          delivery_method: string | null
          duration_minutes: number | null
          exam_code: string | null
          exam_name: string | null
          id: string
          last_verified_date: string | null
          notes: string | null
          number_of_exams: number | null
          price_text: string | null
          question_count_text: string | null
          registration_url: string | null
          updated_at: string
        }
        Insert: {
          certification_id: string
          created_at?: string
          delivery_method?: string | null
          duration_minutes?: number | null
          exam_code?: string | null
          exam_name?: string | null
          id?: string
          last_verified_date?: string | null
          notes?: string | null
          number_of_exams?: number | null
          price_text?: string | null
          question_count_text?: string | null
          registration_url?: string | null
          updated_at?: string
        }
        Update: {
          certification_id?: string
          created_at?: string
          delivery_method?: string | null
          duration_minutes?: number | null
          exam_code?: string | null
          exam_name?: string | null
          id?: string
          last_verified_date?: string | null
          notes?: string | null
          number_of_exams?: number | null
          price_text?: string | null
          question_count_text?: string | null
          registration_url?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "exams_certification_id_fkey"
            columns: ["certification_id"]
            isOneToOne: false
            referencedRelation: "certifications"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          id: string
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          id: string
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          id?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      providers: {
        Row: {
          accent_color: string | null
          active: boolean
          created_at: string
          description: string | null
          id: string
          name: string
          provider_type: string | null
          slug: string
          updated_at: string
          website_url: string | null
        }
        Insert: {
          accent_color?: string | null
          active?: boolean
          created_at?: string
          description?: string | null
          id?: string
          name: string
          provider_type?: string | null
          slug: string
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          accent_color?: string | null
          active?: boolean
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          provider_type?: string | null
          slug?: string
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      renewal_policies: {
        Row: {
          certification_id: string
          created_at: string
          id: string
          last_verified_date: string | null
          notes: string | null
          official_renewal_url: string | null
          renewal_method: string | null
          updated_at: string
          validity_period_text: string | null
        }
        Insert: {
          certification_id: string
          created_at?: string
          id?: string
          last_verified_date?: string | null
          notes?: string | null
          official_renewal_url?: string | null
          renewal_method?: string | null
          updated_at?: string
          validity_period_text?: string | null
        }
        Update: {
          certification_id?: string
          created_at?: string
          id?: string
          last_verified_date?: string | null
          notes?: string | null
          official_renewal_url?: string | null
          renewal_method?: string | null
          updated_at?: string
          validity_period_text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "renewal_policies_certification_id_fkey"
            columns: ["certification_id"]
            isOneToOne: true
            referencedRelation: "certifications"
            referencedColumns: ["id"]
          },
        ]
      }
      resources: {
        Row: {
          certification_id: string
          cost_type: string | null
          created_at: string
          description: string | null
          featured: boolean
          id: string
          is_official: boolean
          last_verified_date: string | null
          provider_name: string | null
          resource_type: string
          title: string
          updated_at: string
          url: string | null
        }
        Insert: {
          certification_id: string
          cost_type?: string | null
          created_at?: string
          description?: string | null
          featured?: boolean
          id?: string
          is_official?: boolean
          last_verified_date?: string | null
          provider_name?: string | null
          resource_type: string
          title: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          certification_id?: string
          cost_type?: string | null
          created_at?: string
          description?: string | null
          featured?: boolean
          id?: string
          is_official?: boolean
          last_verified_date?: string | null
          provider_name?: string | null
          resource_type?: string
          title?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resources_certification_id_fkey"
            columns: ["certification_id"]
            isOneToOne: false
            referencedRelation: "certifications"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
