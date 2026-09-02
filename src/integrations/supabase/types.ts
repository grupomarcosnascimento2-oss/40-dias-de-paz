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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      avisos: {
        Row: {
          ativo: boolean
          created_at: string
          id: string
          mensagem: string
          publico: string
          tipo: string
          titulo: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          id?: string
          mensagem: string
          publico?: string
          tipo: string
          titulo: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          id?: string
          mensagem?: string
          publico?: string
          tipo?: string
          titulo?: string
        }
        Relationships: []
      }
      jornadas: {
        Row: {
          created_at: string
          dias_concluidos: number
          tem_acesso: boolean
          ultima_conclusao: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          dias_concluidos?: number
          tem_acesso?: boolean
          ultima_conclusao?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          dias_concluidos?: number
          tem_acesso?: boolean
          ultima_conclusao?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      leads_captacao: {
        Row: {
          created_at: string
          email: string
          id: string
          nome: string
          whatsapp: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          nome: string
          whatsapp?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          nome?: string
          whatsapp?: string | null
        }
        Relationships: []
      }
      logs_acesso: {
        Row: {
          created_at: string
          id: string
          papel: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          papel: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          papel?: string
          user_id?: string
        }
        Relationships: []
      }
      pedidos_oracao: {
        Row: {
          created_at: string
          fixado: boolean
          id: string
          nome: string
          papel: string
          texto: string
          user_id: string
        }
        Insert: {
          created_at?: string
          fixado?: boolean
          id?: string
          nome: string
          papel?: string
          texto: string
          user_id: string
        }
        Update: {
          created_at?: string
          fixado?: boolean
          id?: string
          nome?: string
          papel?: string
          texto?: string
          user_id?: string
        }
        Relationships: []
      }
      perfis: {
        Row: {
          acessos_devocional: number
          created_at: string
          papel: string
          tornou_se_membro_em: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          acessos_devocional?: number
          created_at?: string
          papel?: string
          tornou_se_membro_em?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          acessos_devocional?: number
          created_at?: string
          papel?: string
          tornou_se_membro_em?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      reacoes_pedidos_oracao: {
        Row: {
          created_at: string
          emoji: string
          id: string
          pedido_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          emoji: string
          id?: string
          pedido_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          emoji?: string
          id?: string
          pedido_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reacoes_pedidos_oracao_pedido_id_fkey"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "pedidos_oracao"
            referencedColumns: ["id"]
          },
        ]
      }
      respostas_pedidos_oracao: {
        Row: {
          created_at: string
          id: string
          nome: string
          pedido_id: string
          texto: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          nome: string
          pedido_id: string
          texto: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          nome?: string
          pedido_id?: string
          texto?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "respostas_pedidos_oracao_pedido_id_fkey"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "pedidos_oracao"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      eh_administrador: { Args: never; Returns: boolean }
      pode_responder_pedidos: { Args: never; Returns: boolean }
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
