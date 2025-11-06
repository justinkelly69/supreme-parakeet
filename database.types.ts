export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  iso: {
    Tables: {
      cities: {
        Row: {
          admin_name: string
          capital: string | null
          country: string
          country_id: string
          id: string
          iso2: string
          iso3: string
          latitude: number | null
          longitude: number | null
          name: string
          name_ascii: string
          population: number | null
        }
        Insert: {
          admin_name: string
          capital?: string | null
          country: string
          country_id: string
          id: string
          iso2: string
          iso3: string
          latitude?: number | null
          longitude?: number | null
          name: string
          name_ascii: string
          population?: number | null
        }
        Update: {
          admin_name?: string
          capital?: string | null
          country?: string
          country_id?: string
          id?: string
          iso2?: string
          iso3?: string
          latitude?: number | null
          longitude?: number | null
          name?: string
          name_ascii?: string
          population?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_country"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      continents: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      countries: {
        Row: {
          area: number | null
          continent_id: string
          demonym: string | null
          density: number | null
          driving_side: string | null
          flag: string
          gdp: number | null
          id: string
          is_enabled: boolean
          is_eu: boolean
          iso2: string | null
          latitude: number | null
          longitude: number | null
          median_age: number | null
          name: string
          population: number | null
          prefix: string
          religion: string | null
          tld: string
          un_member: boolean | null
          website: string | null
        }
        Insert: {
          area?: number | null
          continent_id: string
          demonym?: string | null
          density?: number | null
          driving_side?: string | null
          flag: string
          gdp?: number | null
          id: string
          is_enabled?: boolean
          is_eu?: boolean
          iso2?: string | null
          latitude?: number | null
          longitude?: number | null
          median_age?: number | null
          name: string
          population?: number | null
          prefix: string
          religion?: string | null
          tld: string
          un_member?: boolean | null
          website?: string | null
        }
        Update: {
          area?: number | null
          continent_id?: string
          demonym?: string | null
          density?: number | null
          driving_side?: string | null
          flag?: string
          gdp?: number | null
          id?: string
          is_enabled?: boolean
          is_eu?: boolean
          iso2?: string | null
          latitude?: number | null
          longitude?: number | null
          median_age?: number | null
          name?: string
          population?: number | null
          prefix?: string
          religion?: string | null
          tld?: string
          un_member?: boolean | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_continent"
            columns: ["continent_id"]
            isOneToOne: false
            referencedRelation: "continents"
            referencedColumns: ["id"]
          },
        ]
      }
      country_currencies: {
        Row: {
          country_id: string | null
          currency_id: string | null
          id: number
          is_enabled: boolean
        }
        Insert: {
          country_id?: string | null
          currency_id?: string | null
          id?: number
          is_enabled?: boolean
        }
        Update: {
          country_id?: string | null
          currency_id?: string | null
          id?: number
          is_enabled?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "fk_country"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_currency"
            columns: ["currency_id"]
            isOneToOne: false
            referencedRelation: "currencies"
            referencedColumns: ["id"]
          },
        ]
      }
      country_languages: {
        Row: {
          country_id: string
          id: number
          is_enabled: boolean
          language_id: string
        }
        Insert: {
          country_id: string
          id?: number
          is_enabled?: boolean
          language_id: string
        }
        Update: {
          country_id?: string
          id?: number
          is_enabled?: boolean
          language_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_country"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_language"
            columns: ["language_id"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["id"]
          },
        ]
      }
      currencies: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      languages: {
        Row: {
          id: string
          is_enabled: boolean
          name: string | null
        }
        Insert: {
          id: string
          is_enabled?: boolean
          name?: string | null
        }
        Update: {
          id?: string
          is_enabled?: boolean
          name?: string | null
        }
        Relationships: []
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
  public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      city_details: {
        Row: {
          admin_name: string | null
          capital: string | null
          country: string | null
          country_id: string | null
          description: string | null
          id: string | null
          is_enabled: boolean | null
          iso2: string | null
          iso3: string | null
          latitude: number | null
          longitude: number | null
          name: string | null
          name_ascii: string | null
          population: number | null
          zoom: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_country"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "country_details"
            referencedColumns: ["id"]
          },
        ]
      }
      continent_details: {
        Row: {
          description: string | null
          id: string | null
          latitude: number | null
          longitude: number | null
          name: string | null
          zoom: number | null
        }
        Relationships: []
      }
      country_details: {
        Row: {
          area: number | null
          continent_id: string | null
          continent_name: string | null
          currencies: Json | null
          demonym: string | null
          density: number | null
          description: string | null
          driving_side: string | null
          flag: string | null
          gdp: number | null
          id: string | null
          is_enabled: boolean | null
          is_eu: boolean | null
          iso2: string | null
          languages: Json | null
          latitude: number | null
          longitude: number | null
          median_age: number | null
          name: string | null
          population: number | null
          prefix: string | null
          religion: string | null
          tld: string | null
          un_member: boolean | null
          website: string | null
          zoom: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_continent"
            columns: ["continent_id"]
            isOneToOne: false
            referencedRelation: "continent_details"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      enable_disable_enabled_countries: {
        Args: { enabled_countries: Json }
        Returns: undefined
      }
      get_continent_with_countries: {
        Args: { continent_id: string }
        Returns: Json
      }
      get_country_with_cities: { Args: { country_id: string }; Returns: Json }
      get_world_continents: {
        Args: never
        Returns: {
          description: string | null
          id: string | null
          latitude: number | null
          longitude: number | null
          name: string | null
          zoom: number | null
        }[]
        SetofOptions: {
          from: "*"
          to: "continent_details"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      set_enabled_cities: {
        Args: { enabled_cities: string[] }
        Returns: undefined
      }
      set_enabled_countries: {
        Args: { enabled_countries: string[] }
        Returns: undefined
      }
      update_enabled_countries: {
        Args: { enabled_countries: Json }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  world: {
    Tables: {
      enabled_cities: {
        Row: {
          description: string
          id: string
          is_enabled: boolean
          latitude: number | null
          longitude: number | null
          zoom: number
        }
        Insert: {
          description?: string
          id: string
          is_enabled?: boolean
          latitude?: number | null
          longitude?: number | null
          zoom?: number
        }
        Update: {
          description?: string
          id?: string
          is_enabled?: boolean
          latitude?: number | null
          longitude?: number | null
          zoom?: number
        }
        Relationships: []
      }
      enabled_continents: {
        Row: {
          description: string
          id: string
          latitude: number
          longitude: number
          zoom: number
        }
        Insert: {
          description?: string
          id: string
          latitude?: number
          longitude?: number
          zoom?: number
        }
        Update: {
          description?: string
          id?: string
          latitude?: number
          longitude?: number
          zoom?: number
        }
        Relationships: []
      }
      enabled_countries: {
        Row: {
          description: string
          id: string
          is_enabled: boolean
          latitude: number | null
          longitude: number | null
          zoom: number
        }
        Insert: {
          description?: string
          id: string
          is_enabled?: boolean
          latitude?: number | null
          longitude?: number | null
          zoom?: number
        }
        Update: {
          description?: string
          id?: string
          is_enabled?: boolean
          latitude?: number | null
          longitude?: number | null
          zoom?: number
        }
        Relationships: []
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
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  iso: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
  world: {
    Enums: {},
  },
} as const

