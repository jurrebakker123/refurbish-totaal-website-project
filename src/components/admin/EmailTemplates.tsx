
import React from 'react';

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  preview: string;
  category: 'promotional' | 'informational' | 'seasonal' | 'followup';
  html: string;
}

export const emailTemplates: EmailTemplate[] = [
  {
    id: 'spring-renovation',
    name: '🌸 Lente Renovatie Actie',
    subject: 'Geef uw huis een lentemakeover! 25% korting op alle renovaties',
    preview: 'Lente is het perfecte seizoen voor renovaties. Profiteer nu van onze speciale korting!',
    category: 'seasonal',
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);">
        <div style="background: linear-gradient(135deg, #059669 0%, #047857 100%); color: white; padding: 40px; text-align: center; position: relative; overflow: hidden;">
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><circle cx=\"20\" cy=\"20\" r=\"2\" fill=\"rgba(255,255,255,0.1)\"/><circle cx=\"80\" cy=\"40\" r=\"3\" fill=\"rgba(255,255,255,0.1)\"/><circle cx=\"40\" cy=\"80\" r=\"2\" fill=\"rgba(255,255,255,0.1)\"/></svg>'); opacity: 0.3;"></div>
          <h1 style="margin: 0; font-size: 32px; font-weight: 700; position: relative; z-index: 2;">🌸 Lente Renovatie Actie!</h1>
          <p style="margin: 15px 0 0 0; font-size: 18px; opacity: 0.9; position: relative; z-index: 2;">25% korting op alle renovatieprojecten</p>
          <div style="background: rgba(255,255,255,0.2); padding: 15px 25px; border-radius: 25px; display: inline-block; margin-top: 20px; backdrop-filter: blur(10px); position: relative; z-index: 2;">
            <span style="font-size: 24px; font-weight: 700; color: #fbbf24;">Tot 31 mei 2024</span>
          </div>
        </div>
        
        <div style="padding: 40px 30px;">
          <div style="text-align: center; margin-bottom: 35px;">
            <h2 style="color: #059669; font-size: 28px; margin: 0 0 15px 0;">Maak van uw droomhuis werkelijkheid!</h2>
            <p style="font-size: 18px; color: #374151; line-height: 1.6; margin: 0;">De lente is het perfecte moment om uw huis een nieuwe uitstraling te geven. Profiteer nu van onze exclusieve korting!</p>
          </div>
          
          <div style="display: grid; gap: 25px; margin: 35px 0;">
            <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-left: 5px solid #059669;">
              <h3 style="color: #059669; margin: 0 0 15px 0; font-size: 20px; display: flex; align-items: center;">
                🏠 <span style="margin-left: 10px;">Dakkapellen</span>
              </h3>
              <p style="margin: 0; color: #6b7280; font-size: 16px; line-height: 1.6;">Creëer extra woonruimte met onze op maat gemaakte dakkapellen. Professioneel gemonteerd en volledig verzorgd.</p>
              <div style="margin-top: 15px; font-weight: 600; color: #dc2626;">
                <span style="text-decoration: line-through; color: #9ca3af;">Vanaf €15.000</span>
                <span style="margin-left: 10px; color: #059669; font-size: 18px;">Nu vanaf €11.250</span>
              </div>
            </div>
            
            <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-left: 5px solid #2563eb;">
              <h3 style="color: #2563eb; margin: 0 0 15px 0; font-size: 20px; display: flex; align-items: center;">
                ☀️ <span style="margin-left: 10px;">Zonnepanelen</span>
              </h3>
              <p style="margin: 0; color: #6b7280; font-size: 16px; line-height: 1.6;">Bespaar op uw energierekening met refurbished zonnepanelen van topkwaliteit. Inclusief garantie en montage.</p>
              <div style="margin-top: 15px; font-weight: 600; color: #dc2626;">
                <span style="text-decoration: line-through; color: #9ca3af;">Vanaf €8.000</span>
                <span style="margin-left: 10px; color: #059669; font-size: 18px;">Nu vanaf €6.000</span>
              </div>
            </div>
            
            <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-left: 5px solid #f59e0b;">
              <h3 style="color: #f59e0b; margin: 0 0 15px 0; font-size: 20px; display: flex; align-items: center;">
                🔧 <span style="margin-left: 10px;">Algemene Renovaties</span>
              </h3>
              <p style="margin: 0; color: #6b7280; font-size: 16px; line-height: 1.6;">Van kozijnen tot complete verbouwingen. Onze vakspecialisten staan voor u klaar.</p>
              <div style="margin-top: 15px; font-weight: 600; color: #f59e0b; font-size: 16px;">
                25% korting op alle werkzaamheden
              </div>
            </div>
          </div>
          
          <div style="text-align: center; margin: 40px 0;">
            <a href="tel:0854444255" style="display: inline-block; background: linear-gradient(135deg, #059669 0%, #047857 100%); color: white; padding: 18px 35px; border-radius: 30px; text-decoration: none; font-weight: 700; font-size: 18px; box-shadow: 0 8px 25px rgba(5,150,105,0.3); transition: transform 0.3s ease;">
              📞 Bel nu: 085 4444 255
            </a>
            <p style="margin: 15px 0 0 0; color: #6b7280; font-size: 14px;">Of vraag een gratis offerte aan via onze website</p>
          </div>
          
          <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 25px; border-radius: 12px; text-align: center; margin: 30px 0;">
            <p style="margin: 0; color: #92400e; font-weight: 600; font-size: 16px;">
              ⏰ <strong>Beperkte tijd!</strong> Actie geldig tot 31 mei 2024
            </p>
            <p style="margin: 10px 0 0 0; color: #b45309; font-size: 14px;">
              Vraag snel uw gratis offerte aan en profiteer van deze exclusieve korting
            </p>
          </div>
        </div>
        
        <div style="background: #374151; color: white; padding: 25px; text-align: center;">
          <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">🏠 Refurbish Totaal Nederland</p>
          <p style="margin: 0; font-size: 14px; opacity: 0.9; line-height: 1.6;">
            📞 085 4444 255 | 📧 info@refurbishtotaalnederland.nl<br>
            🌐 www.refurbishtotaalnederland.nl
          </p>
        </div>
      </div>
    `
  },
  {
    id: 'winter-preparation',
    name: '❄️ Winterklaar Maken',
    subject: 'Maak uw huis winterklaar! Isolatie en verwarmingscheck',
    preview: 'De winter komt eraan. Zorg ervoor dat uw huis goed geïsoleerd is.',
    category: 'seasonal',
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);">
        <div style="background: linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%); color: white; padding: 40px; text-align: center;">
          <h1 style="margin: 0; font-size: 32px; font-weight: 700;">❄️ Winterklaar Maken</h1>
          <p style="margin: 15px 0 0 0; font-size: 18px; opacity: 0.9;">Bespaar tot 40% op uw energierekening</p>
        </div>
        
        <div style="padding: 40px 30px;">
          <div style="text-align: center; margin-bottom: 35px;">
            <h2 style="color: #1e40af; font-size: 28px; margin: 0 0 15px 0;">Is uw huis klaar voor de winter?</h2>
            <p style="font-size: 18px; color: #374151; line-height: 1.6; margin: 0;">Met de juiste isolatie en energiemaatregelen bespaart u flink op uw stookkosten!</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 8px 25px rgba(0,0,0,0.1); margin: 30px 0;">
            <h3 style="color: #dc2626; margin: 0 0 20px 0; font-size: 22px; text-align: center;">🚨 Waarschuwing: Energieprijzen stijgen!</h3>
            <p style="font-size: 16px; color: #374151; line-height: 1.6; text-align: center; margin: 0;">
              Zorg ervoor dat u voorbereid bent op de koude maanden. Onze wintercheck helpt u flink te besparen.
            </p>
          </div>
          
          <div style="display: grid; gap: 20px; margin: 35px 0;">
            <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
              <h4 style="color: #1e40af; margin: 0 0 15px 0; font-size: 18px;">🏠 Isolatiecheck</h4>
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 15px;">Spouwmuur-, dak- en vloerisolatie</p>
              <p style="margin: 0; font-weight: 600; color: #059669;">✅ Gratis inspectie en advies</p>
            </div>
            
            <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
              <h4 style="color: #1e40af; margin: 0 0 15px 0; font-size: 18px;">🔥 CV-ketel onderhoud</h4>
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 15px;">Optimale werking en veiligheid</p>
              <p style="margin: 0; font-weight: 600; color: #059669;">✅ Vanaf €85 (normaal €120)</p>
            </div>
            
            <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
              <h4 style="color: #1e40af; margin: 0 0 15px 0; font-size: 18px;">🪟 Kozijnen en kierdichting</h4>
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 15px;">Stop warmteverlies door kieren</p>
              <p style="margin: 0; font-weight: 600; color: #059669;">✅ 30% korting in oktober</p>
            </div>
          </div>
          
          <div style="text-align: center; margin: 40px 0;">
            <a href="tel:0854444255" style="display: inline-block; background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 18px 35px; border-radius: 30px; text-decoration: none; font-weight: 700; font-size: 18px; box-shadow: 0 8px 25px rgba(220,38,38,0.3);">
              🔥 Plan nu uw wintercheck
            </a>
          </div>
        </div>
        
        <div style="background: #374151; color: white; padding: 25px; text-align: center;">
          <p style="margin: 0; font-size: 14px; opacity: 0.9;">
            📞 085 4444 255 | 📧 info@refurbishtotaalnederland.nl
          </p>
        </div>
      </div>
    `
  },
  {
    id: 'customer-follow-up',
    name: '💫 Klanttevredenheid Follow-up',
    subject: 'Hoe bevalt uw nieuwe dakkapel/zonnepanelen?',
    preview: 'We horen graag over uw ervaring en bieden extra service.',
    category: 'followup',
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #fef7ff 0%, #f3e8ff 100%);">
        <div style="background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%); color: white; padding: 40px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px; font-weight: 700;">💫 Hoe bevalt uw project?</h1>
          <p style="margin: 15px 0 0 0; font-size: 16px; opacity: 0.9;">Uw mening is belangrijk voor ons</p>
        </div>
        
        <div style="padding: 40px 30px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: #7c3aed; font-size: 24px; margin: 0 0 15px 0;">Beste [Naam],</h2>
            <p style="font-size: 16px; color: #374151; line-height: 1.6; margin: 0;">
              Een paar weken geleden hebben wij uw [Project] succesvol afgerond. We hopen dat u er veel plezier van heeft!
            </p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 8px 25px rgba(0,0,0,0.1); margin: 30px 0; text-align: center;">
            <h3 style="color: #059669; margin: 0 0 20px 0; font-size: 20px;">⭐ Deel uw ervaring</h3>
            <p style="font-size: 16px; color: #374151; line-height: 1.6; margin: 0 0 25px 0;">
              Een review helpt andere klanten bij hun keuze en helpt ons onze service te verbeteren.
            </p>
            <a href="#" style="display: inline-block; background: linear-gradient(135deg, #059669 0%, #047857 100%); color: white; padding: 15px 30px; border-radius: 25px; text-decoration: none; font-weight: 600; font-size: 16px;">
              📝 Schrijf een review
            </a>
          </div>
          
          <div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); padding: 25px; border-radius: 12px; margin: 30px 0;">
            <h4 style="color: #065f46; margin: 0 0 15px 0; font-size: 18px;">🎁 Exclusief voor u: Vrienden kortingsactie</h4>
            <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0 0 15px 0;">
              Tevreden over ons werk? Krijg €200 korting voor elke vriend die u doorverwijst en een project laat uitvoeren!
            </p>
            <div style="background: white; padding: 15px; border-radius: 8px; text-align: center;">
              <p style="margin: 0; color: #065f46; font-weight: 600;">Uw referentiecode: REF2024-[ID]</p>
            </div>
          </div>
          
          <div style="display: grid; gap: 20px; margin: 30px 0;">
            <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
              <h5 style="color: #7c3aed; margin: 0 0 10px 0; font-size: 16px;">🔧 Nazorg en onderhoud</h5>
              <p style="margin: 0; color: #6b7280; font-size: 14px;">Advies over onderhoud en optimaal gebruik</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
              <h5 style="color: #7c3aed; margin: 0 0 10px 0; font-size: 16px;">📞 Directe hulplijn</h5>
              <p style="margin: 0; color: #6b7280; font-size: 14px;">085 4444 255 voor vragen of service</p>
            </div>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <p style="font-size: 16px; color: #374151; line-height: 1.6; margin: 0 0 20px 0;">
              Heeft u vragen of wilt u aanvullende werkzaamheden laten uitvoeren?
            </p>
            <a href="tel:0854444255" style="display: inline-block; background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%); color: white; padding: 15px 30px; border-radius: 25px; text-decoration: none; font-weight: 600; font-size: 16px;">
              📞 Neem contact op
            </a>
          </div>
        </div>
        
        <div style="background: #374151; color: white; padding: 25px; text-align: center;">
          <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">Hartelijk dank voor uw vertrouwen!</p>
          <p style="margin: 0; font-size: 14px; opacity: 0.9;">
            🏠 Refurbish Totaal Nederland | 📞 085 4444 255
          </p>
        </div>
      </div>
    `
  },
  {
    id: 'summer-solar-special',
    name: '☀️ Zomer Zonnepanelen Actie',
    subject: 'Zomer = Zon = Besparing! 30% korting op zonnepanelen',
    preview: 'Profiteer van de zomer en bespaar flink op uw energierekening.',
    category: 'promotional',
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #fefce8 0%, #fef3c7 100%);">
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 40px; text-align: center; position: relative; overflow: hidden;">
          <div style="position: absolute; top: 20px; right: 20px; font-size: 40px; opacity: 0.3;">☀️</div>
          <div style="position: absolute; bottom: 20px; left: 20px; font-size: 30px; opacity: 0.3;">⚡</div>
          <h1 style="margin: 0; font-size: 32px; font-weight: 700; position: relative; z-index: 2;">☀️ Zomer Zonnepanelen Actie!</h1>
          <p style="margin: 15px 0 0 0; font-size: 18px; opacity: 0.9; position: relative; z-index: 2;">30% korting + gratis montage</p>
          <div style="background: rgba(255,255,255,0.2); padding: 15px 25px; border-radius: 25px; display: inline-block; margin-top: 20px; backdrop-filter: blur(10px); position: relative; z-index: 2;">
            <span style="font-size: 20px; font-weight: 700;">Alleen in juli & augustus</span>
          </div>
        </div>
        
        <div style="padding: 40px 30px;">
          <div style="text-align: center; margin-bottom: 35px;">
            <h2 style="color: #d97706; font-size: 28px; margin: 0 0 15px 0;">De zon schijnt, de prijzen dalen!</h2>
            <p style="font-size: 18px; color: #374151; line-height: 1.6; margin: 0;">Nu is het perfecte moment om te investeren in duurzame energie. Profiteer van onze zomeractie!</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 8px 25px rgba(0,0,0,0.1); margin: 30px 0; text-align: center;">
            <h3 style="color: #dc2626; margin: 0 0 20px 0; font-size: 24px;">💰 Uw besparing berekend</h3>
            <div style="display: grid; gap: 15px;">
              <div style="background: #fef3c7; padding: 20px; border-radius: 10px;">
                <p style="margin: 0; font-size: 18px; color: #92400e;"><strong>Gemiddeld huishouden:</strong></p>
                <p style="margin: 5px 0 0 0; font-size: 24px; font-weight: 700; color: #d97706;">€1.200 per jaar besparing</p>
              </div>
              <div style="background: #ecfdf5; padding: 20px; border-radius: 10px;">
                <p style="margin: 0; font-size: 18px; color: #065f46;"><strong>Terugverdientijd:</strong></p>
                <p style="margin: 5px 0 0 0; font-size: 24px; font-weight: 700; color: #059669;">Slechts 4-5 jaar</p>
              </div>
            </div>
          </div>
          
          <div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); padding: 25px; border-radius: 12px; margin: 30px 0; border-left: 5px solid #dc2626;">
            <h4 style="color: #dc2626; margin: 0 0 15px 0; font-size: 20px;">🚨 Waarom nu bestellen?</h4>
            <ul style="margin: 0; padding-left: 20px; color: #374151;">
              <li style="margin-bottom: 8px;">Energieprijzen blijven stijgen</li>
              <li style="margin-bottom: 8px;">Subsidies nemen af in 2025</li>
              <li style="margin-bottom: 8px;">Beperkte voorraad refurbished panelen</li>
              <li>Optimale installatie-periode (goed weer)</li>
            </ul>
          </div>
          
          <div style="display: grid; gap: 20px; margin: 35px 0;">
            <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-left: 5px solid #f59e0b;">
              <h4 style="color: #d97706; margin: 0 0 15px 0; font-size: 18px;">📦 Refurbished Premium Pakket</h4>
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 15px;">12 panelen, 4kWp, inclusief omvormer en montage</p>
              <div style="margin-top: 15px;">
                <span style="text-decoration: line-through; color: #9ca3af; font-size: 16px;">€8.500</span>
                <span style="margin-left: 10px; color: #d97706; font-size: 20px; font-weight: 700;">Nu €5.950</span>
              </div>
            </div>
            
            <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-left: 5px solid #059669;">
              <h4 style="color: #059669; margin: 0 0 15px 0; font-size: 18px;">⭐ Refurbished Comfort Pakket</h4>
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 15px;">16 panelen, 5.5kWp, inclusief omvormer en montage</p>
              <div style="margin-top: 15px;">
                <span style="text-decoration: line-through; color: #9ca3af; font-size: 16px;">€11.200</span>
                <span style="margin-left: 10px; color: #059669; font-size: 20px; font-weight: 700;">Nu €7.840</span>
              </div>
            </div>
          </div>
          
          <div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); padding: 25px; border-radius: 12px; text-align: center; margin: 30px 0;">
            <h4 style="color: #065f46; margin: 0 0 15px 0; font-size: 18px;">🎁 Extra voordelen bij bestelling in juli/augustus:</h4>
            <ul style="margin: 0; padding: 0; list-style: none; color: #374151;">
              <li style="margin-bottom: 8px;">✅ Gratis montage (waarde €800)</li>
              <li style="margin-bottom: 8px;">✅ 15 jaar garantie op panelen</li>
              <li style="margin-bottom: 8px;">✅ Gratis monitoring systeem</li>
              <li>✅ Nazorg en onderhoud eerste jaar gratis</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 40px 0;">
            <a href="tel:0854444255" style="display: inline-block; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 20px 40px; border-radius: 30px; text-decoration: none; font-weight: 700; font-size: 18px; box-shadow: 0 8px 25px rgba(245,158,11,0.3); margin-bottom: 15px;">
              ☀️ Gratis offerte aanvragen
            </a>
            <p style="margin: 0; color: #6b7280; font-size: 14px;">Of plan een gratis locatiebezoek via onze website</p>
          </div>
          
          <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 20px; border-radius: 12px; text-align: center;">
            <p style="margin: 0; color: #92400e; font-weight: 600; font-size: 16px;">
              ⏰ Actie geldig tot 31 augustus 2024 of zolang de voorraad strekt
            </p>
          </div>
        </div>
        
        <div style="background: #374151; color: white; padding: 25px; text-align: center;">
          <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">☀️ Refurbish Totaal Nederland</p>
          <p style="margin: 0; font-size: 14px; opacity: 0.9; line-height: 1.6;">
            📞 085 4444 255 | 📧 info@refurbishtotaalnederland.nl<br>
            🌐 www.refurbishtotaalnederland.nl
          </p>
        </div>
      </div>
    `
  }
];

export const getTemplatesByCategory = (category: string) => {
  return emailTemplates.filter(template => template.category === category);
};

export const getTemplateById = (id: string) => {
  return emailTemplates.find(template => template.id === id);
};
