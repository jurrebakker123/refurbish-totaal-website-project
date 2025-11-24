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
    PostgrestVersion: "12.2.3 (519615d)"
  }
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
      content_sections: {
        Row: {
          button_link: string | null
          button_text: string | null
          content: string | null
          content_type: string
          created_at: string
          id: string
          image_url: string | null
          is_active: boolean | null
          order_index: number | null
          page_name: string
          section_name: string
          title: string | null
          updated_at: string
        }
        Insert: {
          button_link?: string | null
          button_text?: string | null
          content?: string | null
          content_type?: string
          created_at?: string
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          order_index?: number | null
          page_name: string
          section_name: string
          title?: string | null
          updated_at?: string
        }
        Update: {
          button_link?: string | null
          button_text?: string | null
          content?: string | null
          content_type?: string
          created_at?: string
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          order_index?: number | null
          page_name?: string
          section_name?: string
          title?: string | null
          updated_at?: string
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
          file_url: string | null
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
          file_url?: string | null
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
          file_url?: string | null
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
          file_url: string | null
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
          file_url?: string | null
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
          file_url?: string | null
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
      facturen: {
        Row: {
          bedrag: number
          beschrijving: string
          betaald_op: string | null
          created_at: string
          email_verzonden_op: string | null
          factuur_nummer: string
          factuurdatum: string
          herinnering_1_verzonden_op: string | null
          herinnering_2_verzonden_op: string | null
          herinnering_3_verzonden_op: string | null
          id: string
          klant_adres: string
          klant_email: string
          klant_naam: string
          notities: string | null
          project_id: string
          project_type: string
          status: string
          type: string
          updated_at: string
          vervaldatum: string | null
        }
        Insert: {
          bedrag: number
          beschrijving: string
          betaald_op?: string | null
          created_at?: string
          email_verzonden_op?: string | null
          factuur_nummer: string
          factuurdatum?: string
          herinnering_1_verzonden_op?: string | null
          herinnering_2_verzonden_op?: string | null
          herinnering_3_verzonden_op?: string | null
          id?: string
          klant_adres: string
          klant_email: string
          klant_naam: string
          notities?: string | null
          project_id: string
          project_type: string
          status?: string
          type: string
          updated_at?: string
          vervaldatum?: string | null
        }
        Update: {
          bedrag?: number
          beschrijving?: string
          betaald_op?: string | null
          created_at?: string
          email_verzonden_op?: string | null
          factuur_nummer?: string
          factuurdatum?: string
          herinnering_1_verzonden_op?: string | null
          herinnering_2_verzonden_op?: string | null
          herinnering_3_verzonden_op?: string | null
          id?: string
          klant_adres?: string
          klant_email?: string
          klant_naam?: string
          notities?: string | null
          project_id?: string
          project_type?: string
          status?: string
          type?: string
          updated_at?: string
          vervaldatum?: string | null
        }
        Relationships: []
      }
      klus_reacties: {
        Row: {
          bericht: string
          beschikbaarheid: string | null
          created_at: string | null
          geschatte_duur: string | null
          geschatte_prijs: number | null
          id: string
          klus_id: string | null
          status: string | null
          updated_at: string | null
          vakman_id: string | null
        }
        Insert: {
          bericht: string
          beschikbaarheid?: string | null
          created_at?: string | null
          geschatte_duur?: string | null
          geschatte_prijs?: number | null
          id?: string
          klus_id?: string | null
          status?: string | null
          updated_at?: string | null
          vakman_id?: string | null
        }
        Update: {
          bericht?: string
          beschikbaarheid?: string | null
          created_at?: string | null
          geschatte_duur?: string | null
          geschatte_prijs?: number | null
          id?: string
          klus_id?: string | null
          status?: string | null
          updated_at?: string | null
          vakman_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "klus_reacties_klus_id_fkey"
            columns: ["klus_id"]
            isOneToOne: false
            referencedRelation: "klussen"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "klus_reacties_vakman_id_fkey"
            columns: ["vakman_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      klussen: {
        Row: {
          beschrijving: string
          budget_max: number | null
          budget_min: number | null
          category_id: string | null
          created_at: string | null
          id: string
          klant_id: string | null
          plaats: string
          postcode: string
          status: string | null
          titel: string
          updated_at: string | null
          urgentie: string | null
        }
        Insert: {
          beschrijving: string
          budget_max?: number | null
          budget_min?: number | null
          category_id?: string | null
          created_at?: string | null
          id?: string
          klant_id?: string | null
          plaats: string
          postcode: string
          status?: string | null
          titel: string
          updated_at?: string | null
          urgentie?: string | null
        }
        Update: {
          beschrijving?: string
          budget_max?: number | null
          budget_min?: number | null
          category_id?: string | null
          created_at?: string | null
          id?: string
          klant_id?: string | null
          plaats?: string
          postcode?: string
          status?: string | null
          titel?: string
          updated_at?: string | null
          urgentie?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "klussen_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "klussen_klant_id_fkey"
            columns: ["klant_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          achternaam: string
          adres: string | null
          avatar_url: string | null
          bedrijfsnaam: string | null
          beschrijving: string | null
          btw_nummer: string | null
          created_at: string | null
          id: string
          kvk_nummer: string | null
          plaats: string | null
          postcode: string | null
          telefoon: string | null
          updated_at: string | null
          user_type: string
          voornaam: string
        }
        Insert: {
          achternaam: string
          adres?: string | null
          avatar_url?: string | null
          bedrijfsnaam?: string | null
          beschrijving?: string | null
          btw_nummer?: string | null
          created_at?: string | null
          id: string
          kvk_nummer?: string | null
          plaats?: string | null
          postcode?: string | null
          telefoon?: string | null
          updated_at?: string | null
          user_type: string
          voornaam: string
        }
        Update: {
          achternaam?: string
          adres?: string | null
          avatar_url?: string | null
          bedrijfsnaam?: string | null
          beschrijving?: string | null
          btw_nummer?: string | null
          created_at?: string | null
          id?: string
          kvk_nummer?: string | null
          plaats?: string | null
          postcode?: string | null
          telefoon?: string | null
          updated_at?: string | null
          user_type?: string
          voornaam?: string
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
          file_url: string | null
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
          file_url?: string | null
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
          file_url?: string | null
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
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          klus_id: string | null
          rating: number
          reviewed_id: string | null
          reviewer_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          klus_id?: string | null
          rating: number
          reviewed_id?: string | null
          reviewer_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          klus_id?: string | null
          rating?: number
          reviewed_id?: string | null
          reviewer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_klus_id_fkey"
            columns: ["klus_id"]
            isOneToOne: false
            referencedRelation: "klussen"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewed_id_fkey"
            columns: ["reviewed_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      schilder_aanvragen: {
        Row: {
          aantal_kamers: number | null
          achternaam: string
          afgehandeld_op: string | null
          bericht: string | null
          created_at: string
          emailadres: string
          file_url: string | null
          gewenste_kleur: string | null
          huidige_kleur: string | null
          huisnummer: string
          id: string
          in_aanbouw_op: string | null
          kozijnen_meeverven: boolean | null
          notities: string | null
          offerte_verzonden_op: string | null
          op_locatie_op: string | null
          oppervlakte: number
          plaats: string
          plafond_meeverven: boolean | null
          postcode: string
          project_type: string
          status: string | null
          straatnaam: string
          telefoon: string
          totaal_prijs: number | null
          updated_at: string
          verf_type: string
          voorbewerking_nodig: boolean | null
          voornaam: string
        }
        Insert: {
          aantal_kamers?: number | null
          achternaam: string
          afgehandeld_op?: string | null
          bericht?: string | null
          created_at?: string
          emailadres: string
          file_url?: string | null
          gewenste_kleur?: string | null
          huidige_kleur?: string | null
          huisnummer: string
          id?: string
          in_aanbouw_op?: string | null
          kozijnen_meeverven?: boolean | null
          notities?: string | null
          offerte_verzonden_op?: string | null
          op_locatie_op?: string | null
          oppervlakte: number
          plaats: string
          plafond_meeverven?: boolean | null
          postcode: string
          project_type: string
          status?: string | null
          straatnaam: string
          telefoon: string
          totaal_prijs?: number | null
          updated_at?: string
          verf_type: string
          voorbewerking_nodig?: boolean | null
          voornaam: string
        }
        Update: {
          aantal_kamers?: number | null
          achternaam?: string
          afgehandeld_op?: string | null
          bericht?: string | null
          created_at?: string
          emailadres?: string
          file_url?: string | null
          gewenste_kleur?: string | null
          huidige_kleur?: string | null
          huisnummer?: string
          id?: string
          in_aanbouw_op?: string | null
          kozijnen_meeverven?: boolean | null
          notities?: string | null
          offerte_verzonden_op?: string | null
          op_locatie_op?: string | null
          oppervlakte?: number
          plaats?: string
          plafond_meeverven?: boolean | null
          postcode?: string
          project_type?: string
          status?: string | null
          straatnaam?: string
          telefoon?: string
          totaal_prijs?: number | null
          updated_at?: string
          verf_type?: string
          voorbewerking_nodig?: boolean | null
          voornaam?: string
        }
        Relationships: []
      }
      service_categories: {
        Row: {
          beschrijving: string | null
          created_at: string | null
          icon_name: string | null
          id: string
          is_active: boolean | null
          naam: string
        }
        Insert: {
          beschrijving?: string | null
          created_at?: string | null
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
          naam: string
        }
        Update: {
          beschrijving?: string | null
          created_at?: string | null
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
          naam?: string
        }
        Relationships: []
      }
      sollicitaties: {
        Row: {
          created_at: string
          cv_url: string | null
          email: string
          id: string
          motivatie: string | null
          naam: string
          notities: string | null
          status: string | null
          telefoon: string
          updated_at: string
          vacature_id: string | null
        }
        Insert: {
          created_at?: string
          cv_url?: string | null
          email: string
          id?: string
          motivatie?: string | null
          naam: string
          notities?: string | null
          status?: string | null
          telefoon: string
          updated_at?: string
          vacature_id?: string | null
        }
        Update: {
          created_at?: string
          cv_url?: string | null
          email?: string
          id?: string
          motivatie?: string | null
          naam?: string
          notities?: string | null
          status?: string | null
          telefoon?: string
          updated_at?: string
          vacature_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sollicitaties_vacature_id_fkey"
            columns: ["vacature_id"]
            isOneToOne: false
            referencedRelation: "vacatures"
            referencedColumns: ["id"]
          },
        ]
      }
      stukadoor_aanvragen: {
        Row: {
          aantal_kamers: number | null
          achternaam: string
          afgehandeld_op: string | null
          afwerking: string
          bericht: string | null
          created_at: string
          emailadres: string
          file_url: string | null
          huidige_staat: string | null
          huisnummer: string
          id: string
          in_aanbouw_op: string | null
          isolatie_gewenst: boolean | null
          notities: string | null
          offerte_verzonden_op: string | null
          op_locatie_op: string | null
          oppervlakte: number
          plaats: string
          postcode: string
          status: string | null
          straatnaam: string
          telefoon: string
          totaal_prijs: number | null
          updated_at: string
          voorbewerking: string | null
          voornaam: string
          werk_type: string
        }
        Insert: {
          aantal_kamers?: number | null
          achternaam: string
          afgehandeld_op?: string | null
          afwerking: string
          bericht?: string | null
          created_at?: string
          emailadres: string
          file_url?: string | null
          huidige_staat?: string | null
          huisnummer: string
          id?: string
          in_aanbouw_op?: string | null
          isolatie_gewenst?: boolean | null
          notities?: string | null
          offerte_verzonden_op?: string | null
          op_locatie_op?: string | null
          oppervlakte: number
          plaats: string
          postcode: string
          status?: string | null
          straatnaam: string
          telefoon: string
          totaal_prijs?: number | null
          updated_at?: string
          voorbewerking?: string | null
          voornaam: string
          werk_type: string
        }
        Update: {
          aantal_kamers?: number | null
          achternaam?: string
          afgehandeld_op?: string | null
          afwerking?: string
          bericht?: string | null
          created_at?: string
          emailadres?: string
          file_url?: string | null
          huidige_staat?: string | null
          huisnummer?: string
          id?: string
          in_aanbouw_op?: string | null
          isolatie_gewenst?: boolean | null
          notities?: string | null
          offerte_verzonden_op?: string | null
          op_locatie_op?: string | null
          oppervlakte?: number
          plaats?: string
          postcode?: string
          status?: string | null
          straatnaam?: string
          telefoon?: string
          totaal_prijs?: number | null
          updated_at?: string
          voorbewerking?: string | null
          voornaam?: string
          werk_type?: string
        }
        Relationships: []
      }
      vacatures: {
        Row: {
          benefits: string[] | null
          created_at: string
          description: string
          icon_name: string | null
          id: string
          is_active: boolean | null
          location: string
          order_index: number | null
          requirements: string[] | null
          salary_range: string | null
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          benefits?: string[] | null
          created_at?: string
          description: string
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
          location: string
          order_index?: number | null
          requirements?: string[] | null
          salary_range?: string | null
          title: string
          type?: string
          updated_at?: string
        }
        Update: {
          benefits?: string[] | null
          created_at?: string
          description?: string
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
          location?: string
          order_index?: number | null
          requirements?: string[] | null
          salary_range?: string | null
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      vakman_categories: {
        Row: {
          category_id: string | null
          created_at: string | null
          id: string
          vakman_id: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          id?: string
          vakman_id?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          id?: string
          vakman_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vakman_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vakman_categories_vakman_id_fkey"
            columns: ["vakman_id"]
            isOneToOne: false
            referencedRelation: "profiles"
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
  public: {
    Enums: {},
  },
} as const
