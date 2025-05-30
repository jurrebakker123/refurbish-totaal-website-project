export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string | null
          id: string
          is_super_admin: boolean | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          is_super_admin?: boolean | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_super_admin?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      dakkapel_calculator_aanvragen: {
        Row: {
          aantalramen: number
          achternaam: string
          afgehandeld_op: string | null
          bericht: string | null
          breedte: number
          created_at: string | null
          dakhelling: number
          dakhellingtype: string
          emailadres: string
          hoogte: number
          huisnummer: string
          id: string
          kleurdraaikiepramen: string
          kleurkozijnen: string
          kleurzijkanten: string
          kozijnhoogte: string
          materiaal: string
          notities: string | null
          offerte_verzonden_op: string | null
          opties: Json | null
          plaats: string
          postcode: string
          rcwaarde: string
          status: string | null
          straatnaam: string
          telefoon: string
          totaal_prijs: number | null
          type: string
          updated_at: string | null
          voornaam: string
          woningzijde: string
        }
        Insert: {
          aantalramen: number
          achternaam: string
          afgehandeld_op?: string | null
          bericht?: string | null
          breedte: number
          created_at?: string | null
          dakhelling: number
          dakhellingtype: string
          emailadres: string
          hoogte: number
          huisnummer: string
          id?: string
          kleurdraaikiepramen: string
          kleurkozijnen: string
          kleurzijkanten: string
          kozijnhoogte: string
          materiaal: string
          notities?: string | null
          offerte_verzonden_op?: string | null
          opties?: Json | null
          plaats: string
          postcode: string
          rcwaarde: string
          status?: string | null
          straatnaam: string
          telefoon: string
          totaal_prijs?: number | null
          type: string
          updated_at?: string | null
          voornaam: string
          woningzijde: string
        }
        Update: {
          aantalramen?: number
          achternaam?: string
          afgehandeld_op?: string | null
          bericht?: string | null
          breedte?: number
          created_at?: string | null
          dakhelling?: number
          dakhellingtype?: string
          emailadres?: string
          hoogte?: number
          huisnummer?: string
          id?: string
          kleurdraaikiepramen?: string
          kleurkozijnen?: string
          kleurzijkanten?: string
          kozijnhoogte?: string
          materiaal?: string
          notities?: string | null
          offerte_verzonden_op?: string | null
          opties?: Json | null
          plaats?: string
          postcode?: string
          rcwaarde?: string
          status?: string | null
          straatnaam?: string
          telefoon?: string
          totaal_prijs?: number | null
          type?: string
          updated_at?: string | null
          voornaam?: string
          woningzijde?: string
        }
        Relationships: []
      }
      dakkapel_configuraties: {
        Row: {
          adres: string
          afgehandeld_op: string | null
          airconditioning: boolean | null
          breedte: number
          created_at: string | null
          dakhelling: number | null
          dakhelling_type: string | null
          email: string
          id: string
          in_aanbouw_op: string | null
          insectscreens: boolean | null
          interest_response_at: string | null
          kleur_draaikiepramen: string
          kleur_kozijn: string
          kleur_zijkanten: string
          levertijd: string | null
          materiaal: string
          model: string
          naam: string
          notities: string | null
          offerte_verzonden_op: string | null
          op_locatie_op: string | null
          opmerkingen: string | null
          plaats: string
          postcode: string
          status: string | null
          sunshade: boolean | null
          telefoon: string
          totaal_prijs: number | null
          updated_at: string | null
          ventilationgrids: boolean | null
        }
        Insert: {
          adres: string
          afgehandeld_op?: string | null
          airconditioning?: boolean | null
          breedte: number
          created_at?: string | null
          dakhelling?: number | null
          dakhelling_type?: string | null
          email: string
          id?: string
          in_aanbouw_op?: string | null
          insectscreens?: boolean | null
          interest_response_at?: string | null
          kleur_draaikiepramen: string
          kleur_kozijn: string
          kleur_zijkanten: string
          levertijd?: string | null
          materiaal: string
          model: string
          naam: string
          notities?: string | null
          offerte_verzonden_op?: string | null
          op_locatie_op?: string | null
          opmerkingen?: string | null
          plaats: string
          postcode: string
          status?: string | null
          sunshade?: boolean | null
          telefoon: string
          totaal_prijs?: number | null
          updated_at?: string | null
          ventilationgrids?: boolean | null
        }
        Update: {
          adres?: string
          afgehandeld_op?: string | null
          airconditioning?: boolean | null
          breedte?: number
          created_at?: string | null
          dakhelling?: number | null
          dakhelling_type?: string | null
          email?: string
          id?: string
          in_aanbouw_op?: string | null
          insectscreens?: boolean | null
          interest_response_at?: string | null
          kleur_draaikiepramen?: string
          kleur_kozijn?: string
          kleur_zijkanten?: string
          levertijd?: string | null
          materiaal?: string
          model?: string
          naam?: string
          notities?: string | null
          offerte_verzonden_op?: string | null
          op_locatie_op?: string | null
          opmerkingen?: string | null
          plaats?: string
          postcode?: string
          status?: string | null
          sunshade?: boolean | null
          telefoon?: string
          totaal_prijs?: number | null
          updated_at?: string | null
          ventilationgrids?: boolean | null
        }
        Relationships: []
      }
      refurbished_zonnepanelen: {
        Row: {
          aantal_panelen: number
          adres: string
          afgehandeld_op: string | null
          conditie: string
          created_at: string
          dak_materiaal: string | null
          dak_type: string
          email: string
          id: string
          in_aanbouw_op: string | null
          interest_response_at: string | null
          jaar_fabricage: number | null
          merk: string
          naam: string
          notities: string | null
          offerte_verzonden_op: string | null
          op_locatie_op: string | null
          opmerkingen: string | null
          plaats: string
          postcode: string
          schaduw_situatie: string | null
          status: string | null
          telefoon: string
          totaal_prijs: number | null
          type_paneel: string
          updated_at: string
          vermogen: number
        }
        Insert: {
          aantal_panelen: number
          adres: string
          afgehandeld_op?: string | null
          conditie: string
          created_at?: string
          dak_materiaal?: string | null
          dak_type: string
          email: string
          id?: string
          in_aanbouw_op?: string | null
          interest_response_at?: string | null
          jaar_fabricage?: number | null
          merk: string
          naam: string
          notities?: string | null
          offerte_verzonden_op?: string | null
          op_locatie_op?: string | null
          opmerkingen?: string | null
          plaats: string
          postcode: string
          schaduw_situatie?: string | null
          status?: string | null
          telefoon: string
          totaal_prijs?: number | null
          type_paneel: string
          updated_at?: string
          vermogen: number
        }
        Update: {
          aantal_panelen?: number
          adres?: string
          afgehandeld_op?: string | null
          conditie?: string
          created_at?: string
          dak_materiaal?: string | null
          dak_type?: string
          email?: string
          id?: string
          in_aanbouw_op?: string | null
          interest_response_at?: string | null
          jaar_fabricage?: number | null
          merk?: string
          naam?: string
          notities?: string | null
          offerte_verzonden_op?: string | null
          op_locatie_op?: string | null
          opmerkingen?: string | null
          plaats?: string
          postcode?: string
          schaduw_situatie?: string | null
          status?: string | null
          telefoon?: string
          totaal_prijs?: number | null
          type_paneel?: string
          updated_at?: string
          vermogen?: number
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
