
import { supabase } from '@/integrations/supabase/client';

export const seedAllContent = async () => {
  const contentSections = [
    // Homepage
    { page_name: 'homepage', section_name: 'hero_title', content_type: 'text', title: 'Uw Specialist in Renovatie & Verbouw', order_index: 1 },
    { page_name: 'homepage', section_name: 'hero_subtitle', content_type: 'text', content: 'Van kozijnen tot dakkapellen, van isolatie tot complete renovaties. Wij maken uw droomhuis werkelijkheid met vakmanschap en persoonlijke service.', order_index: 2 },
    { page_name: 'homepage', section_name: 'hero_button_primary', content_type: 'button', button_text: 'Gratis Offerte Aanvragen', button_link: '/offerte', order_index: 3 },
    { page_name: 'homepage', section_name: 'hero_button_secondary', content_type: 'button', button_text: 'Onze Diensten Bekijken', button_link: '/diensten', order_index: 4 },
    { page_name: 'homepage', section_name: 'services_title', content_type: 'text', title: 'Onze Diensten', order_index: 5 },
    { page_name: 'homepage', section_name: 'services_subtitle', content_type: 'text', content: 'Wij bieden een breed scala aan diensten voor uw renovatie- en verbouwprojecten', order_index: 6 },
    { page_name: 'homepage', section_name: 'cta_title', content_type: 'text', title: 'Klaar om te beginnen?', order_index: 7 },
    { page_name: 'homepage', section_name: 'cta_subtitle', content_type: 'text', content: 'Neem contact met ons op voor een vrijblijvend gesprek over uw project', order_index: 8 },
    { page_name: 'homepage', section_name: 'cta_button', content_type: 'button', button_text: 'Contact Opnemen', button_link: '/contact', order_index: 9 },

    // Diensten
    { page_name: 'diensten', section_name: 'hero_title', content_type: 'text', title: 'Onze Diensten', order_index: 1 },
    { page_name: 'diensten', section_name: 'hero_subtitle', content_type: 'text', content: 'Ontdek ons complete aanbod aan renovatie- en verbouwdiensten', order_index: 2 },
    { page_name: 'diensten', section_name: 'intro_text', content_type: 'text', content: 'Refurbish Totaal Nederland is uw betrouwbare partner voor alle renovatie- en verbouwwerkzaamheden. Met jarenlange ervaring en een team van vakkundige specialisten zorgen wij voor kwaliteit en betrouwbaarheid.', order_index: 3 },
    { page_name: 'diensten', section_name: 'why_choose_title', content_type: 'text', title: 'Waarom kiezen voor Refurbish Totaal Nederland?', order_index: 4 },
    { page_name: 'diensten', section_name: 'why_choose_text', content_type: 'text', content: 'Persoonlijke aanpak, vakkundige uitvoering, transparante prijzen en volledige ontzorging van A tot Z.', order_index: 5 },

    // Dienst Detail
    { page_name: 'dienst-detail', section_name: 'contact_cta_title', content_type: 'text', title: 'Interesse in deze dienst?', order_index: 1 },
    { page_name: 'dienst-detail', section_name: 'contact_cta_subtitle', content_type: 'text', content: 'Neem contact met ons op voor een vrijblijvende offerte op maat', order_index: 2 },
    { page_name: 'dienst-detail', section_name: 'contact_button', content_type: 'button', button_text: 'Offerte Aanvragen', button_link: '/offerte', order_index: 3 },
    { page_name: 'dienst-detail', section_name: 'process_title', content_type: 'text', title: 'Hoe werken wij?', order_index: 4 },
    { page_name: 'dienst-detail', section_name: 'process_step_1', content_type: 'text', title: '1. Vrijblijvend Gesprek', content: 'We bespreken uw wensen en maken een afspraak voor een locatiebezoek.', order_index: 5 },
    { page_name: 'dienst-detail', section_name: 'process_step_2', content_type: 'text', title: '2. Offerte op Maat', content: 'Na opname maken we een gedetailleerde offerte voor uw project.', order_index: 6 },
    { page_name: 'dienst-detail', section_name: 'process_step_3', content_type: 'text', title: '3. Vakkundige Uitvoering', content: 'Onze specialisten voeren het werk uit met oog voor detail.', order_index: 7 },

    // Vacatures
    { page_name: 'vacatures', section_name: 'hero_title', content_type: 'text', title: 'Werk bij Refurbish Totaal Nederland', order_index: 1 },
    { page_name: 'vacatures', section_name: 'hero_subtitle', content_type: 'text', content: 'Wij zijn op zoek naar ervaren vakmensen die samen met ons de toekomst van renovatie vormgeven. Sluit je aan bij ons dynamische team!', order_index: 2 },
    { page_name: 'vacatures', section_name: 'why_work_title', content_type: 'text', title: 'Waarom werken bij Refurbish Totaal Nederland?', order_index: 3 },
    { page_name: 'vacatures', section_name: 'benefit_1', content_type: 'text', content: '✓ Uitstekende arbeidsvoorwaarden en salaris', order_index: 4 },
    { page_name: 'vacatures', section_name: 'benefit_2', content_type: 'text', content: '✓ Doorgroeimogelijkheden binnen het bedrijf', order_index: 5 },
    { page_name: 'vacatures', section_name: 'benefit_3', content_type: 'text', content: '✓ Modern gereedschap en werkkleding', order_index: 6 },
    { page_name: 'vacatures', section_name: 'benefit_4', content_type: 'text', content: '✓ Collegiale werksfeer in klein team', order_index: 7 },
    { page_name: 'vacatures', section_name: 'apply_title', content_type: 'text', title: 'Solliciteren', order_index: 8 },
    { page_name: 'vacatures', section_name: 'apply_text', content_type: 'text', content: 'Zie je een passende vacature of wil je een open sollicitatie versturen? Vul het formulier in!', order_index: 9 },

    // Over Ons
    { page_name: 'over-ons', section_name: 'hero_title', content_type: 'text', title: 'Over Refurbish Totaal Nederland', order_index: 1 },
    { page_name: 'over-ons', section_name: 'hero_subtitle', content_type: 'text', content: 'Uw betrouwbare partner in renovatie en verbouw sinds 2010', order_index: 2 },
    { page_name: 'over-ons', section_name: 'story_title', content_type: 'text', title: 'Ons Verhaal', order_index: 3 },
    { page_name: 'over-ons', section_name: 'story_content', content_type: 'text', content: 'Met meer dan 10 jaar ervaring in de bouw en renovatie sector hebben wij ons ontwikkeld tot een betrouwbare partner voor particulieren en bedrijven. Ons team van vakkundige specialisten staat garant voor kwaliteit en vakmanschap.', order_index: 4 },
    { page_name: 'over-ons', section_name: 'mission_title', content_type: 'text', title: 'Onze Missie', order_index: 5 },
    { page_name: 'over-ons', section_name: 'mission_content', content_type: 'text', content: 'Wij streven ernaar om elke klant het beste resultaat te bieden door middel van persoonlijke aandacht, vakkundige uitvoering en transparante communicatie. Uw tevredenheid is onze prioriteit.', order_index: 6 },
    { page_name: 'over-ons', section_name: 'values_title', content_type: 'text', title: 'Onze Waarden', order_index: 7 },
    { page_name: 'over-ons', section_name: 'value_quality', content_type: 'text', title: 'Kwaliteit', content: 'Vakmanschap en oog voor detail in elk project', order_index: 8 },
    { page_name: 'over-ons', section_name: 'value_reliability', content_type: 'text', title: 'Betrouwbaarheid', content: 'Afspraken nakomen en transparante communicatie', order_index: 9 },
    { page_name: 'over-ons', section_name: 'value_service', content_type: 'text', title: 'Service', content: 'Persoonlijke aandacht en maatwerk voor elke klant', order_index: 10 },

    // Contact
    { page_name: 'contact', section_name: 'hero_title', content_type: 'text', title: 'Contact', order_index: 1 },
    { page_name: 'contact', section_name: 'hero_subtitle', content_type: 'text', content: 'Neem contact met ons op voor een vrijblijvend gesprek over uw project', order_index: 2 },
    { page_name: 'contact', section_name: 'form_title', content_type: 'text', title: 'Stuur ons een bericht', order_index: 3 },
    { page_name: 'contact', section_name: 'form_subtitle', content_type: 'text', content: 'Vul het formulier in en wij nemen binnen 24 uur contact met u op', order_index: 4 },
    { page_name: 'contact', section_name: 'contact_info_title', content_type: 'text', title: 'Contactgegevens', order_index: 5 },
    { page_name: 'contact', section_name: 'phone_label', content_type: 'text', content: 'Telefoon:', order_index: 6 },
    { page_name: 'contact', section_name: 'phone_number', content_type: 'text', content: '085-1234567', order_index: 7 },
    { page_name: 'contact', section_name: 'email_label', content_type: 'text', content: 'E-mail:', order_index: 8 },
    { page_name: 'contact', section_name: 'email_address', content_type: 'text', content: 'info@refurbishtotaalnederland.nl', order_index: 9 },
    { page_name: 'contact', section_name: 'hours_label', content_type: 'text', content: 'Openingstijden:', order_index: 10 },
    { page_name: 'contact', section_name: 'hours_text', content_type: 'text', content: 'Ma-Vr: 08:00 - 17:00\nZa: 09:00 - 15:00', order_index: 11 },

    // Dakkapel
    { page_name: 'dakkapel', section_name: 'hero_title', content_type: 'text', title: 'Dakkapel op Maat', order_index: 1 },
    { page_name: 'dakkapel', section_name: 'hero_subtitle', content_type: 'text', content: 'Vergroot uw woonruimte met een kwalitatieve dakkapel. Compleet verzorgd met 10 jaar garantie.', order_index: 2 },
    { page_name: 'dakkapel', section_name: 'hero_button', content_type: 'button', button_text: 'Bereken Direct Uw Prijs', button_link: '/dakkapel-calculator', order_index: 3 },
    { page_name: 'dakkapel', section_name: 'benefits_title', content_type: 'text', title: 'Voordelen van een Dakkapel', order_index: 4 },
    { page_name: 'dakkapel', section_name: 'benefit_space', content_type: 'text', title: 'Meer Woonruimte', content: 'Tot 40% meer bruikbare ruimte op uw zolder', order_index: 5 },
    { page_name: 'dakkapel', section_name: 'benefit_light', content_type: 'text', title: 'Meer Licht', content: 'Natuurlijk licht en frisse lucht in uw zolder', order_index: 6 },
    { page_name: 'dakkapel', section_name: 'benefit_value', content_type: 'text', title: 'Hogere Woningwaarde', content: 'Investering die zich terugverdient', order_index: 7 },
    { page_name: 'dakkapel', section_name: 'process_title', content_type: 'text', title: 'Ons Proces', order_index: 8 },
    { page_name: 'dakkapel', section_name: 'cta_title', content_type: 'text', title: 'Bereken Direct Uw Dakkapel', order_index: 9 },
    { page_name: 'dakkapel', section_name: 'cta_subtitle', content_type: 'text', content: 'Gebruik onze calculator voor een directe prijsindicatie', order_index: 10 },

    // Zonnepanelen
    { page_name: 'zonnepanelen', section_name: 'hero_title', content_type: 'text', title: 'Refurbished Zonnepanelen', order_index: 1 },
    { page_name: 'zonnepanelen', section_name: 'hero_subtitle', content_type: 'text', content: 'Duurzame energie tegen scherpe prijzen. Tot 70% besparing op nieuwe panelen.', order_index: 2 },
    { page_name: 'zonnepanelen', section_name: 'hero_button', content_type: 'button', button_text: 'Bekijk Ons Aanbod', button_link: '#products', order_index: 3 },
    { page_name: 'zonnepanelen', section_name: 'benefits_title', content_type: 'text', title: 'Voordelen van Refurbished Zonnepanelen', order_index: 4 },
    { page_name: 'zonnepanelen', section_name: 'benefit_price', content_type: 'text', title: 'Scherpe Prijs', content: 'Tot 70% goedkoper dan nieuwe panelen', order_index: 5 },
    { page_name: 'zonnepanelen', section_name: 'benefit_quality', content_type: 'text', title: 'Gegarandeerde Kwaliteit', content: 'Grondig getest en 5 jaar garantie', order_index: 6 },
    { page_name: 'zonnepanelen', section_name: 'benefit_environment', content_type: 'text', title: 'Milieuvriendelijk', content: 'Geef panelen een tweede leven', order_index: 7 },
    { page_name: 'zonnepanelen', section_name: 'products_title', content_type: 'text', title: 'Ons Aanbod', order_index: 8 },

    // Isolatie
    { page_name: 'isolatie', section_name: 'hero_title', content_type: 'text', title: 'Isolatie Selectie', order_index: 1 },
    { page_name: 'isolatie', section_name: 'hero_subtitle', content_type: 'text', content: 'Bespaar tot 60% op uw energierekening met professionele woningisolatie', order_index: 2 },
    { page_name: 'isolatie', section_name: 'hero_button', content_type: 'button', button_text: 'Vraag Offerte Aan', button_link: '/offerte', order_index: 3 },
    { page_name: 'isolatie', section_name: 'benefits_title', content_type: 'text', title: 'Voordelen van Professionele Isolatie', order_index: 4 },
    { page_name: 'isolatie', section_name: 'benefit_energy', content_type: 'text', title: 'Energiebesparing', content: 'Tot 60% lagere energiekosten', order_index: 5 },
    { page_name: 'isolatie', section_name: 'benefit_comfort', content_type: 'text', title: 'Meer Comfort', content: 'Stabiele temperatuur het hele jaar', order_index: 6 },
    { page_name: 'isolatie', section_name: 'benefit_subsidy', content_type: 'text', title: 'Subsidies', content: 'Profiteer van beschikbare regelingen', order_index: 7 },

    // Footer
    { page_name: 'footer', section_name: 'company_description', content_type: 'text', content: 'Refurbish Totaal Nederland is uw betrouwbare partner voor alle renovatie- en verbouwwerkzaamheden. Van klein onderhoud tot complete verbouwingen.', order_index: 1 },
    { page_name: 'footer', section_name: 'contact_title', content_type: 'text', title: 'Contact', order_index: 2 },
    { page_name: 'footer', section_name: 'services_title', content_type: 'text', title: 'Diensten', order_index: 3 },
    { page_name: 'footer', section_name: 'quick_links_title', content_type: 'text', title: 'Snelle Links', order_index: 4 },
    { page_name: 'footer', section_name: 'follow_us_title', content_type: 'text', title: 'Volg Ons', order_index: 5 },
    { page_name: 'footer', section_name: 'copyright_text', content_type: 'text', content: '© 2024 Refurbish Totaal Nederland. Alle rechten voorbehouden.', order_index: 6 },

    // Header
    { page_name: 'header', section_name: 'logo_text', content_type: 'text', content: 'Refurbish Totaal Nederland', order_index: 1 },
    { page_name: 'header', section_name: 'phone_number', content_type: 'text', content: '085-1234567', order_index: 2 },
    { page_name: 'header', section_name: 'cta_button', content_type: 'button', button_text: 'Gratis Offerte', button_link: '/offerte', order_index: 3 },
    { page_name: 'header', section_name: 'nav_home', content_type: 'text', content: 'Home', order_index: 4 },
    { page_name: 'header', section_name: 'nav_services', content_type: 'text', content: 'Diensten', order_index: 5 },
    { page_name: 'header', section_name: 'nav_about', content_type: 'text', content: 'Over Ons', order_index: 6 },
    { page_name: 'header', section_name: 'nav_contact', content_type: 'text', content: 'Contact', order_index: 7 }
  ];

  try {
    const { error } = await supabase
      .from('content_sections')
      .upsert(contentSections.map(section => ({ ...section, is_active: true })), { onConflict: 'page_name,section_name' });

    if (error) throw error;
    
    return { success: true, message: 'All content seeded successfully!' };
  } catch (error) {
    console.error('Error seeding content:', error);
    return { success: false, error };
  }
};
