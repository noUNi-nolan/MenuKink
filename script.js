function getVal(name, type='radio') {
    if (type === 'radio') {
    const el = document.querySelector(`input[name="${name}"]:checked`);
    return el ? el.value : '—';
    }
    return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map(e => e.value).join(', ') || '—';
}

function isNoUNi() {
    const pseudo = (document.getElementById('pseudo')?.value || '').trim();
    return pseudo === 'noUNi' || pseudo === 'no⋃Ni' || pseudo === 'noUni';
}

function toggleSex(key) {
    const box = document.querySelector(`input[name="${key}_sex"]`);
    const panel = document.getElementById('sex-' + key);
    if (!panel) return;
    const show = !!box?.checked;
    panel.style.display = show ? 'block' : 'none';
    if (show) updateSexGenrePanels(panel);
}

function updateSexGenrePanels(root) {
    const genre = document.querySelector('input[name="genre"]:checked')?.value;
    const scope = root || document;
    scope.querySelectorAll('.sex-genre-homme').forEach(el => {
    el.style.display = genre === 'Homme' ? 'block' : 'none';
    });
    scope.querySelectorAll('.sex-genre-femme').forEach(el => {
    el.style.display = genre === 'Femme' ? 'block' : 'none';
    });
}

function updateLockedPractices() {
    const unlock = isNoUNi();
    // Knife Play & Primal
    ['chk-knife', 'chk-primal'].forEach(id => {
    const chk = document.getElementById(id);
    if (!chk) return;
    chk.disabled = !unlock;
    if (!unlock) chk.checked = false;
    const label = chk.closest('label');
    if (label) {
        label.style.opacity = unlock ? '1' : '0.45';
        label.style.cursor = unlock ? 'pointer' : 'not-allowed';
    }
    if (id === 'chk-primal') {
        const sub = document.getElementById('sub-primal');
        if (sub && !unlock) sub.style.display = 'none';
    }
    });
    // Re-evaluate restricted sub-forms
    ['edge', 'primal', 'ddlg'].forEach(t => toggleSub(t));
}


function toggleSub(type) {
    const map = {
    shibari: { chk: 'chk-shibari', sub: 'sub-shibari' },
    spanking: { chk: 'chk-spanking', sub: 'sub-spanking' },
    wax: { chk: 'chk-wax', sub: 'sub-wax' },
    needle: { chk: 'chk-needle', sub: 'sub-needle' },
    facesitting: { chk: 'chk-facesitting', sub: 'sub-facesitting' },
    cunnilingus: { chk: 'chk-cunnilingus', sub: 'sub-cunnilingus' },
    privation: { chk: 'chk-privation', sub: 'sub-privation' },
    discipline: { chk: 'chk-discipline', sub: 'sub-discipline' },
    cmc: { chk: 'chk-cmc', sub: 'sub-cmc' },
    edge: { chk: 'chk-edge', sub: 'sub-edge' },
    primal: { chk: 'chk-primal', sub: 'sub-primal' },
    bondage: { chk: 'chk-bondage', sub: 'sub-bondage' },
    bdsm: { chk: 'chk-bdsm', sub: 'sub-bdsm' },
    handleur: { chk: 'chk-handleur', sub: 'sub-handleur' },
    petplay: { chk: 'chk-petplay', sub: 'sub-petplay' },
    ddlg: { chk: 'chk-ddlg', sub: 'sub-ddlg' },
    abdl: { chk: 'chk-abdl', sub: 'sub-abdl' },
    uro: { chk: 'chk-uro', sub: 'sub-uro' },
    femdom: { chk: 'chk-femdom', sub: 'sub-femdom' },
    urofemme: { chk: 'chk-urofemme', sub: 'sub-urofemme' },
    anal: { chk: 'chk-anal', sub: 'sub-anal' },
    knife: { chk: 'chk-knife', sub: 'sub-knife' },
    electro: { chk: 'chk-electro', sub: 'sub-electro' },
    fire: { chk: 'chk-fire', sub: 'sub-fire' },
    breath: { chk: 'chk-breath', sub: 'sub-breath' },
    medical: { chk: 'chk-medical', sub: 'sub-medical' },
    sounding: { chk: 'chk-sounding', sub: 'sub-sounding' },
    cbt: { chk: 'chk-cbt', sub: 'sub-cbt' },
    humiliation: { chk: 'chk-humiliation', sub: 'sub-humiliation' },
    exhibition: { chk: 'chk-exhibition', sub: 'sub-exhibition' },
    cnc: { chk: 'chk-cnc', sub: 'sub-cnc' },
    service: { chk: 'chk-service', sub: 'sub-service' },
    boot: { chk: 'chk-boot', sub: 'sub-boot' },
    tickle: { chk: 'chk-tickle', sub: 'sub-tickle' },
    temperature: { chk: 'chk-temperature', sub: 'sub-temperature' },
    mummification: { chk: 'chk-mummification', sub: 'sub-mummification' },
    roleplay: { chk: 'chk-roleplay', sub: 'sub-roleplay' },
    financial: { chk: 'chk-financial', sub: 'sub-financial' },
    sleepsack: { chk: 'chk-sleepsack', sub: 'sub-sleepsack' },
    gunplay: { chk: 'chk-gunplay', sub: 'sub-gunplay' },
    sissy: { chk: 'chk-sissy', sub: 'sub-sissy' },
    feminisation: { chk: 'chk-feminisation', sub: 'sub-feminisation' },
    degradation: { chk: 'chk-degradation', sub: 'sub-degradation' },
    raceplay: { chk: 'chk-raceplay', sub: 'sub-raceplay' },
    bnwo: { chk: 'chk-bnwo', sub: 'sub-bnwo' },
    mnwo: { chk: 'chk-mnwo', sub: 'sub-mnwo' },
    wnwo: { chk: 'chk-wnwo', sub: 'sub-wnwo' },
    gynarchie: { chk: 'chk-gynarchie', sub: 'sub-gynarchie' },
    mnwomuslim: { chk: 'chk-mnwo-muslim', sub: 'sub-mnwomuslim' },
    };

    const item = map[type];
    if (!item) return;
    const checked = document.getElementById(item.chk)?.checked;
    const el = document.getElementById(item.sub);
    if (!el) return;

    // Edge Play, Primal et DD/lg.b : sous-formulaires réservés au pseudo noUNi
    const restricted = ['edge', 'primal', 'knife'];
    if (restricted.includes(type)) {
    if (checked && isNoUNi()) {
        el.style.display = 'block';
        if (type === 'edge' || type === 'ddlg') updateGenderSubs();
    } else {
        el.style.display = 'none';
    }
    return;
    }

    el.style.display = checked ? 'block' : 'none';
}


function updateGenderSubs() {
    const genre = document.querySelector('input[name="genre"]:checked')?.value;
    // Edge Play
    ['edge-homme','edge-femme','edge-autre'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
    });
    if (genre === 'Homme') document.getElementById('edge-homme').style.display = 'block';
    else if (genre === 'Femme') document.getElementById('edge-femme').style.display = 'block';
    else document.getElementById('edge-autre').style.display = 'block';

    // DD/lg.b
    ['ddlg-homme','ddlg-femme','ddlg-autre'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
    });
    if (genre === 'Homme') document.getElementById('ddlg-homme').style.display = 'block';
    else if (genre === 'Femme') document.getElementById('ddlg-femme').style.display = 'block';
    else document.getElementById('ddlg-autre').style.display = 'block';
}



// Active / désactive les options SUB réservées aux femmes
// (sauf si pseudo = noUNi → tout est accessible)
function updateFemmeOnly() {
    const isFemme = document.querySelector('input[name="genre"][value="Femme"]')?.checked;
    const unlock = isNoUNi() || isFemme;
    document.querySelectorAll('.femme-only-chk').forEach(chk => {
    chk.disabled = !unlock;
    if (!unlock) {
        chk.checked = false;
        const subMap = {
        'chk-facesitting': 'sub-facesitting',
        'chk-cunnilingus': 'sub-cunnilingus',
        'chk-femdom': 'sub-femdom',
        'chk-urofemme': 'sub-urofemme',
        'chk-anal': 'sub-anal',
        'chk-gynarchie': 'sub-gynarchie',
        };

        if (subMap[chk.id]) {
        const el = document.getElementById(subMap[chk.id]);
        if (el) el.style.display = 'none';
        }
    }
    const label = chk.closest('label');
    if (label) {
        label.style.opacity = unlock ? '1' : '0.45';
        label.style.cursor = unlock ? 'pointer' : 'not-allowed';
    }
    });
}



// Écoute le changement de genre
document.querySelectorAll('input[name="genre"]').forEach(r => {
    r.addEventListener('change', () => {
    updateFemmeOnly();
    updateGenderSubs();
    document.querySelectorAll('[id^="sex-"]').forEach(p => {
        if (p.style.display !== 'none') updateSexGenrePanels(p);
    });
    });
});

// Écoute le pseudo : débloque toutes les pratiques + sous-formulaires restreints
document.getElementById('pseudo')?.addEventListener('input', () => {
    updateLockedPractices();
    updateFemmeOnly();
});


function buildText() {
    const pratiques = getVal('pratique', 'checkbox');
    let extra = '';

    // Shibari
    if (document.getElementById('chk-shibari')?.checked) {
    extra += `\n--- Détails Shibari ---
Figures : ${getVal('shibari_fig', 'checkbox')}
Position : ${getVal('shibari_pos', 'checkbox')}
Compléments : ${getVal('shibari_extra', 'checkbox')}
Spécificités genre : ${getVal('shibari_genre', 'checkbox')}
Sexualisation : ${getVal('shibari_sex_opt', 'checkbox')}\n`;
    }
    // Spanking/Impact
    if (document.getElementById('chk-spanking')?.checked) {
    extra += `\n--- Détails Spanking/Impact ---
Objets acceptés : ${getVal('impact_obj', 'checkbox')}
Intensité d'impact : ${getVal('impact_intensite')}
Spécificités genre : ${getVal('impact_genre', 'checkbox')}
Sexualisation : ${getVal('impact_sex_opt', 'checkbox')}\n`;
    }
    // Wax
    if (document.getElementById('chk-wax')?.checked) {
    extra += `\n--- Détails Wax Play ---
Types de cire : ${getVal('wax_type', 'checkbox')}
Intensité de chaleur : ${getVal('wax_chaleur')}
Zones & sécurité : ${getVal('wax_extra', 'checkbox')}
Spécificités genre : ${getVal('wax_genre', 'checkbox')}
Sexualisation : ${getVal('wax_sex_opt', 'checkbox')}\n`;
    }
    // Needle
    if (document.getElementById('chk-needle')?.checked) {
    extra += `\n--- Détails Needle Play ---
Zones : ${getVal('needle_zone', 'checkbox')}
Épaisseur (G) : ${getVal('needle_g', 'checkbox')}
Longueur (mm) : ${getVal('needle_mm', 'checkbox')}
Nombre : ${document.getElementById('needle_nb')?.value || '—'}
Style : ${getVal('needle_style')}
Hygiène : ${getVal('needle_extra', 'checkbox')}
Spécificités genre : ${getVal('needle_genre', 'checkbox')}
Sexualisation : ${getVal('needle_sex_opt', 'checkbox')}\n`;
    }
    // Face-sitting details
    if (document.getElementById('chk-facesitting')?.checked) {
    extra += `\n--- Détails Face-sitting ---
Durée : ${getVal('fs_duree')}
Pression / Intensité : ${getVal('fs_pression')}
Tenue : ${getVal('fs_tenue', 'checkbox')}
Options : ${getVal('fs_options', 'checkbox')}
Spécificités genre : ${getVal('fs_genre', 'checkbox')}
Sexualisation : ${getVal('fs_sex_opt', 'checkbox')}\n`;
    }
    // Cunnilingus details
    if (document.getElementById('chk-cunnilingus')?.checked) {
    extra += `\n--- Détails Cunnilingus ---
Durée : ${getVal('cunni_duree')}
Style / Intensité : ${getVal('cunni_style', 'checkbox')}
Options : ${getVal('cunni_options', 'checkbox')}
Spécificités genre : ${getVal('cunni_genre', 'checkbox')}
Sexualisation : ${getVal('cunni_sex_opt', 'checkbox')}\n`;
    }

    if (document.getElementById('chk-privation')?.checked) {
    extra += `\n--- Détails Privation sensorielle ---
Sens : ${getVal('priv_sens', 'checkbox')}
Intensité : ${getVal('priv_intensite')}
Accessoires : ${getVal('priv_extra', 'checkbox')}
Spécificités genre : ${getVal('priv_genre', 'checkbox')}
Sexualisation : ${getVal('priv_sex_opt', 'checkbox')}\n`;
    }

    if (document.getElementById('chk-discipline')?.checked) {
    extra += `\n--- Détails Discipline ---
Type : ${getVal('disc_type', 'checkbox')}
Intensité : ${getVal('disc_intensite')}
Cadre : ${getVal('disc_extra', 'checkbox')}
Spécificités genre : ${getVal('disc_genre', 'checkbox')}
Sexualisation : ${getVal('disc_sex_opt', 'checkbox')}\n`;
    }

    if (document.getElementById('chk-cmc')?.checked) {
    extra += `\n--- Détails CMC ---
Dispositif : ${getVal('cmc_type', 'checkbox')}
Durée : ${getVal('cmc_duree')}
Modalités : ${getVal('cmc_extra', 'checkbox')}
Spécificités genre : ${getVal('cmc_genre', 'checkbox')}
Sexualisation : ${getVal('cmc_sex_opt', 'checkbox')}\n`;
    }

    if (document.getElementById('chk-edge')?.checked) {
    const genre = document.querySelector('input[name="genre"]:checked')?.value;
    let focus = '—';
    if (genre === 'Homme') focus = getVal('edge_h', 'checkbox');
    else if (genre === 'Femme') focus = getVal('edge_f', 'checkbox');
    else focus = getVal('edge_a', 'checkbox');
    extra += `\n--- Détails Edge Play ---
Focus : ${focus}
Niveau de risque : ${getVal('edge_risque')}
Sécurité : ${getVal('edge_extra', 'checkbox')}
Spécificités genre : ${getVal('edge_genre', 'checkbox')}
Sexualisation : ${getVal('edge_sex_opt', 'checkbox')}\n`;
    }

    if (document.getElementById('chk-primal')?.checked) {
    extra += `\n--- Détails Primal ---
Style : ${getVal('primal_style', 'checkbox')}
Intensité : ${getVal('primal_intensite')}
Limites physiques : ${getVal('primal_extra', 'checkbox')}
Spécificités genre : ${getVal('primal_genre', 'checkbox')}
Sexualisation : ${getVal('primal_sex_opt', 'checkbox')}\n`;
    }

    if (document.getElementById('chk-bondage')?.checked) {
    extra += `\n--- Détails Bondage ---
Matériel : ${getVal('bond_mat', 'checkbox')}
Style : ${getVal('bond_style', 'checkbox')}
Sécurité : ${getVal('bond_extra', 'checkbox')}
Spécificités genre : ${getVal('bond_genre', 'checkbox')}
Sexualisation : ${getVal('bond_sex_opt', 'checkbox')}\n`;
    }

    if (document.getElementById('chk-bdsm')?.checked) {
    extra += `\n--- Détails BDSM (général) ---
Axes : ${getVal('bdsm_axes', 'checkbox')}
Cadre : ${getVal('bdsm_cadre')}
Négociation : ${getVal('bdsm_extra', 'checkbox')}
Spécificités genre : ${getVal('bdsm_genre', 'checkbox')}
Sexualisation : ${getVal('bdsm_sex_opt', 'checkbox')}\n`;
    }

    if (document.getElementById('chk-handleur')?.checked) {
    extra += `\n--- Détails Handleur ---
Type : ${getVal('hand_type', 'checkbox')}
Intensité : ${getVal('hand_intensite')}
Style de contrôle : ${getVal('hand_extra', 'checkbox')}
Spécificités genre : ${getVal('hand_genre', 'checkbox')}
Sexualisation : ${getVal('hand_sex_opt', 'checkbox')}\n`;
    }

    if (document.getElementById('chk-petplay')?.checked) {
    extra += `\n--- Détails Pet Play ---
Matériel : ${getVal('pet_gear')}
Rôle : ${getVal('pet_role', 'checkbox')}
Éléments : ${getVal('pet_elem', 'checkbox')}
Comportements : ${getVal('pet_extra', 'checkbox')}
Spécificités genre : ${getVal('pet_genre', 'checkbox')}
Sexualisation : ${getVal('pet_sex_opt', 'checkbox')}\n`;
    }

    if (document.getElementById('chk-ddlg')?.checked) {
    const genre = document.querySelector('input[name="genre"]:checked')?.value;
    let dyn = '—';
    if (genre === 'Homme') dyn = getVal('ddlg_h', 'checkbox');
    else if (genre === 'Femme') dyn = getVal('ddlg_f', 'checkbox');
    else dyn = getVal('ddlg_a', 'checkbox');
    extra += `\n--- Détails DD/lg.b ---
Dynamique : ${dyn}
Matériel : ${getVal('ddlg_gear')}
Niveau d'âge mental : ${getVal('ddlg_age')}
Cadre émotionnel : ${getVal('ddlg_extra', 'checkbox')}
Spécificités genre : ${getVal('ddlg_genre', 'checkbox')}
Sexualisation : ${getVal('ddlg_sex_opt', 'checkbox')}\n`;
    }

    if (document.getElementById('chk-abdl')?.checked) {
    extra += `\n--- Détails ABDL ---
Éléments : ${getVal('abdl_elem', 'checkbox')}
Matériel : ${getVal('abdl_gear')}
Niveau : ${getVal('abdl_niveau')}
Confort : ${getVal('abdl_extra', 'checkbox')}
Spécificités genre : ${getVal('abdl_genre', 'checkbox')}
Sexualisation : ${getVal('abdl_sex_opt', 'checkbox')}\n`;
    }

    if (document.getElementById('chk-uro')?.checked) {
    extra += `\n--- Détails Uro ---
Rôle : ${getVal('uro_role')}
Modalités : ${getVal('uro_mod', 'checkbox')}
Hygiène & cadre : ${getVal('uro_extra', 'checkbox')}
Spécificités genre : ${getVal('uro_genre', 'checkbox')}
Sexualisation : ${getVal('uro_sex_opt', 'checkbox')}\n`;
    }

    if (document.getElementById('chk-femdom')?.checked) {
    extra += `\n--- Détails Femdom ---
Style : ${getVal('femdom_style', 'checkbox')}
Intensité : ${getVal('femdom_intensite')}
Outils : ${getVal('femdom_extra', 'checkbox')}
Spécificités genre : ${getVal('femdom_genre', 'checkbox')}
Sexualisation : ${getVal('femdom_sex_opt', 'checkbox')}\n`;
    }
    // Uro SUB
    if (document.getElementById('chk-urofemme')?.checked) {
    extra += `\n--- Détails Uro (SUB) ---
Rôle : ${getVal('urof_role')}
Modalités : ${getVal('urof_mod', 'checkbox')}
Sexualisation : ${getVal('urof_sex_opt', 'checkbox')}\n`;
    }
    // Anal
    if (document.getElementById('chk-knife')?.checked) {
    extra += `\n--- Détails Knife Play ---
Type de lame : ${getVal('knife_type', 'checkbox')}
Style : ${getVal('knife_style', 'checkbox')}
Zones : ${getVal('knife_zone', 'checkbox')}
Risque : ${getVal('knife_risque')}
Sexualisation : ${getVal('knife_sex_opt', 'checkbox')}\n`;
    }

        if (document.getElementById('chk-electro')?.checked) {
    extra += `\n--- electro ---\nDurée min/max : ${document.querySelector('[name="electro_dmin"]')?.value || '—'} – ${document.querySelector('[name="electro_dmax"]')?.value || '—'}\nSexualisation : ${getVal('electro_sex_opt', 'checkbox')}\n`;
    }

    if (document.getElementById('chk-fire')?.checked) {
    extra += `\n--- fire ---\nDurée min/max : ${document.querySelector('[name="fire_dmin"]')?.value || '—'} – ${document.querySelector('[name="fire_dmax"]')?.value || '—'}\nSexualisation : ${getVal('fire_sex_opt', 'checkbox')}\n`;
    }

    if (document.getElementById('chk-breath')?.checked) {
    extra += `\n--- breath ---\nDurée min/max : ${document.querySelector('[name="breath_dmin"]')?.value || '—'} – ${document.querySelector('[name="breath_dmax"]')?.value || '—'}\nSexualisation : ${getVal('breath_sex_opt', 'checkbox')}\n`;
    }

    if (document.getElementById('chk-medical')?.checked) {
    extra += `\n--- medical ---\nDurée min/max : ${document.querySelector('[name="medical_dmin"]')?.value || '—'} – ${document.querySelector('[name="medical_dmax"]')?.value || '—'}\nSexualisation : ${getVal('medical_sex_opt', 'checkbox')}\n`;
    }

    if (document.getElementById('chk-sounding')?.checked) {
    extra += `\n--- sounding ---\nDurée min/max : ${document.querySelector('[name="sounding_dmin"]')?.value || '—'} – ${document.querySelector('[name="sounding_dmax"]')?.value || '—'}\nSexualisation : ${getVal('sounding_sex_opt', 'checkbox')}\n`;
    }

    if (document.getElementById('chk-cbt')?.checked) {
    extra += `\n--- cbt ---\nDurée min/max : ${document.querySelector('[name="cbt_dmin"]')?.value || '—'} – ${document.querySelector('[name="cbt_dmax"]')?.value || '—'}\nSexualisation : ${getVal('cbt_sex_opt', 'checkbox')}\n`;
    }

    if (document.getElementById('chk-humiliation')?.checked) {
    extra += `\n--- humiliation ---\nDurée min/max : ${document.querySelector('[name="humiliation_dmin"]')?.value || '—'} – ${document.querySelector('[name="humiliation_dmax"]')?.value || '—'}\nSexualisation : ${getVal('humiliation_sex_opt', 'checkbox')}\n`;
    }

    if (document.getElementById('chk-exhibition')?.checked) {
    extra += `\n--- exhibition ---\nDurée min/max : ${document.querySelector('[name="exhibition_dmin"]')?.value || '—'} – ${document.querySelector('[name="exhibition_dmax"]')?.value || '—'}\nSexualisation : ${getVal('exhibition_sex_opt', 'checkbox')}\n`;
    }

    if (document.getElementById('chk-cnc')?.checked) {
    extra += `\n--- cnc ---\nDurée min/max : ${document.querySelector('[name="cnc_dmin"]')?.value || '—'} – ${document.querySelector('[name="cnc_dmax"]')?.value || '—'}\nSexualisation : ${getVal('cnc_sex_opt', 'checkbox')}\n`;
    }

    if (document.getElementById('chk-service')?.checked) {
    extra += `\n--- service ---\nDurée min/max : ${document.querySelector('[name="service_dmin"]')?.value || '—'} – ${document.querySelector('[name="service_dmax"]')?.value || '—'}\nSexualisation : ${getVal('service_sex_opt', 'checkbox')}\n`;
    }

    if (document.getElementById('chk-boot')?.checked) {
    extra += `\n--- boot ---\nDurée min/max : ${document.querySelector('[name="boot_dmin"]')?.value || '—'} – ${document.querySelector('[name="boot_dmax"]')?.value || '—'}\nSexualisation : ${getVal('boot_sex_opt', 'checkbox')}\n`;
    }

    if (document.getElementById('chk-tickle')?.checked) {
    extra += `\n--- tickle ---\nDurée min/max : ${document.querySelector('[name="tickle_dmin"]')?.value || '—'} – ${document.querySelector('[name="tickle_dmax"]')?.value || '—'}\nSexualisation : ${getVal('tickle_sex_opt', 'checkbox')}\n`;
    }

    if (document.getElementById('chk-temperature')?.checked) {
    extra += `\n--- temperature ---\nDurée min/max : ${document.querySelector('[name="temperature_dmin"]')?.value || '—'} – ${document.querySelector('[name="temperature_dmax"]')?.value || '—'}\nSexualisation : ${getVal('temperature_sex_opt', 'checkbox')}\n`;
    }

    if (document.getElementById('chk-mummification')?.checked) {
    extra += `\n--- mummification ---\nDurée min/max : ${document.querySelector('[name="mummification_dmin"]')?.value || '—'} – ${document.querySelector('[name="mummification_dmax"]')?.value || '—'}\nSexualisation : ${getVal('mummification_sex_opt', 'checkbox')}\n`;
    }

    if (document.getElementById('chk-roleplay')?.checked) {
    extra += `\n--- roleplay ---\nDurée min/max : ${document.querySelector('[name="roleplay_dmin"]')?.value || '—'} – ${document.querySelector('[name="roleplay_dmax"]')?.value || '—'}\nSexualisation : ${getVal('roleplay_sex_opt', 'checkbox')}\n`;
    }

    if (document.getElementById('chk-financial')?.checked) {
    extra += `\n--- financial ---\nDurée min/max : ${document.querySelector('[name="financial_dmin"]')?.value || '—'} – ${document.querySelector('[name="financial_dmax"]')?.value || '—'}\nSexualisation : ${getVal('financial_sex_opt', 'checkbox')}\n`;
    }

    if (document.getElementById('chk-sleepsack')?.checked) {
    extra += `\n--- sleepsack ---\nDurée min/max : ${document.querySelector('[name="sleepsack_dmin"]')?.value || '—'} – ${document.querySelector('[name="sleepsack_dmax"]')?.value || '—'}\nSexualisation : ${getVal('sleepsack_sex_opt', 'checkbox')}\n`;
    }

    if (document.getElementById('chk-gunplay')?.checked) {
    extra += `\n--- gunplay ---\nDurée min/max : ${document.querySelector('[name="gunplay_dmin"]')?.value || '—'} – ${document.querySelector('[name="gunplay_dmax"]')?.value || '—'}\nSexualisation : ${getVal('gunplay_sex_opt', 'checkbox')}\n`;
    }

    if (document.getElementById('chk-anal')?.checked) {
    extra += `\n--- Détails Anal ---
Rôle : ${getVal('anal_role')}
Préparation : ${getVal('anal_prep', 'checkbox')}
Intensité : ${getVal('anal_intensite')}
Spécificités genre : ${getVal('anal_genre', 'checkbox')}
Contraintes : ${getVal('anal_contrainte', 'checkbox')}
Sexualisation : ${getVal('anal_sex_opt', 'checkbox')}\n`;
    }
    if (document.getElementById('chk-sissy')?.checked) {
    extra += `\n--- Sissy ---
Durée : ${document.querySelector('[name="sissy_dmin"]')?.value || '—'} – ${document.querySelector('[name="sissy_dmax"]')?.value || '—'}
Tenue : ${getVal('sissy_tenue', 'checkbox')}
Comportements : ${getVal('sissy_comp', 'checkbox')}
Intensité : ${getVal('sissy_int')}
Matériel : ${getVal('sissy_gear')}
Sexualisation : ${getVal('sissy_sex_opt', 'checkbox')}\n`;
    }
    if (document.getElementById('chk-feminisation')?.checked) {
    extra += `\n--- Féminisation ---
Durée : ${document.querySelector('[name="feminisation_dmin"]')?.value || '—'} – ${document.querySelector('[name="feminisation_dmax"]')?.value || '—'}
Transformation : ${getVal('femz_transfo', 'checkbox')}
Tenue : ${getVal('femz_tenue', 'checkbox')}
Identité : ${getVal('femz_id', 'checkbox')}
Cadre : ${getVal('femz_cadre')}
Matériel : ${getVal('femz_gear')}
Sexualisation : ${getVal('feminisation_sex_opt', 'checkbox')}\n`;
    }
    if (document.getElementById('chk-degradation')?.checked) {
    extra += `\n--- Dégradation ---
Durée : ${document.querySelector('[name="degradation_dmin"]')?.value || '—'} – ${document.querySelector('[name="degradation_dmax"]')?.value || '—'}
Formes : ${getVal('deg_forme', 'checkbox')}
Thèmes : ${getVal('deg_theme', 'checkbox')}
Limites express : ${getVal('deg_lim', 'checkbox')}
Intensité : ${getVal('deg_int')}
Sexualisation : ${getVal('degradation_sex_opt', 'checkbox')}\n`;
    }

    if (document.getElementById('chk-raceplay')?.checked) {
        extra += `\n--- Race Play ---
        Durée : ${document.querySelector('[name="raceplay_dmin"]')?.value || '—'} – ${document.querySelector('[name="raceplay_dmax"]')?.value || '—'}
        Orientation : ${getVal('rp_orient', 'checkbox')}
        Éléments : ${getVal('rp_elem', 'checkbox')}
        Intensité : ${getVal('rp_int')}
        Sécurité : ${getVal('rp_sec', 'checkbox')}
        Sexualisation : ${getVal('raceplay_sex_opt', 'checkbox')}\n`;
    }

    if (document.getElementById('chk-bnwo')?.checked) {
        extra += `\n--- BNWO ---
        Durée : ${document.querySelector('[name="bnwo_dmin"]')?.value || '—'} – ${document.querySelector('[name="bnwo_dmax"]')?.value || '—'}
        Rôle : ${getVal('bnwo_role')}
        Éléments : ${getVal('bnwo_elem', 'checkbox')}
        Intensité : ${getVal('bnwo_int')}
        Sécurité : ${getVal('bnwo_sec', 'checkbox')}
        Sexualisation : ${getVal('bnwo_sex_opt', 'checkbox')}\n`;
    }

    if (document.getElementById('chk-mnwo')?.checked) {
        extra += `\n--- MNWO ---
        Durée : ${document.querySelector('[name="mnwo_dmin"]')?.value || '—'} – ${document.querySelector('[name="mnwo_dmax"]')?.value || '—'}
        Rôle : ${getVal('mnwo_role')}
        Éléments : ${getVal('mnwo_elem', 'checkbox')}
        Intensité : ${getVal('mnwo_int')}
        Sécurité : ${getVal('mnwo_sec', 'checkbox')}
        Sexualisation : ${getVal('mnwo_sex_opt', 'checkbox')}\n`;
    }

    if (document.getElementById('chk-wnwo')?.checked) {
        extra += `\n--- WNWO ---
        Durée : ${document.querySelector('[name="wnwo_dmin"]')?.value || '—'} – ${document.querySelector('[name="wnwo_dmax"]')?.value || '—'}
        Rôle : ${getVal('wnwo_role')}
        Éléments : ${getVal('wnwo_elem', 'checkbox')}
        Intensité : ${getVal('wnwo_int')}
        Sécurité : ${getVal('wnwo_sec', 'checkbox')}
        Sexualisation : ${getVal('wnwo_sex_opt', 'checkbox')}\n`;
    }

    if (document.getElementById('chk-gynarchie')?.checked) {
        extra += `\n--- Gynarchie ---
        Durée : ${document.querySelector('[name="gynarchie_dmin"]')?.value || '—'} – ${document.querySelector('[name="gynarchie_dmax"]')?.value || '—'}
        Rôle : ${getVal('gyn_role')}
        Axes : ${getVal('gyn_axes', 'checkbox')}
        Adresse : ${getVal('gyn_adresse', 'checkbox')}
        Intensité : ${getVal('gyn_int')}
        Cadre : ${getVal('gyn_cadre')}
        Sexualisation : ${getVal('gynarchie_sex_opt', 'checkbox')}\n`;
    }

    if (document.getElementById('chk-mnwo-muslim')?.checked) {
        extra += `\n--- MNWO (Muslim NWO) ---
        Durée : ${document.querySelector('[name="mnwom_dmin"]')?.value || '—'} – ${document.querySelector('[name="mnwom_dmax"]')?.value || '—'}
        Rôle : ${getVal('mnwom_role')}
        Orientation : ${getVal('mnwom_orient', 'checkbox')}
        Éléments : ${getVal('mnwom_elem', 'checkbox')}
        Intensité : ${getVal('mnwom_int')}
        Sécurité : ${getVal('mnwom_sec', 'checkbox')}
        Sexualisation : ${getVal('mnwomuslim_sex_opt', 'checkbox')}\n`;
    }

    return `=== RÉSERVATION PRÉ-SESSION (GLOBALE) ===



Soirée : ${document.getElementById('soiree').value || '—'}
Date : ${document.getElementById('date').value || '—'}

Pseudo : ${document.getElementById('pseudo').value || '—'}
Genre : ${getVal('genre')}
Pronoms : ${getVal('pronoms')}
Rôle : ${getVal('role')}
Expérience : ${getVal('exp')}
Partenaire(s) : ${getVal('partenaire', 'checkbox')}
Disponibilité (durant la soirée) : ${getVal('dispo', 'checkbox')}


Pratiques :
${pratiques.split(', ').map(p => '• ' + p).join('\n')}
${extra}
Intensité globale : ${getVal('intensite')}
Durée : ${document.getElementById('duree').value || '—'}
Aftercare : ${getVal('aftercare', 'checkbox')}
Cadre : ${getVal('cadre', 'checkbox')}

Limites dures : ${document.getElementById('limites_dures').value || '—'}
Limites souples : ${document.getElementById('limites_souples').value || '—'}
Safeword : ${document.getElementById('safeword').value || '—'} ${document.getElementById('safeword_rov')?.checked ? '(Rouge/Orange/Vert)' : ''}
Protocolaire : ${document.getElementById('protocolaire')?.checked ? 'Oui' : 'Non'}


Commentaires :
${document.getElementById('commentaires').value || '—'}
`;
}


function generate() {
    const text = buildText();
    const res = document.getElementById('result');
    res.style.display = 'block';
    res.textContent = text;
    res.dataset.text = text;
}

function copyResult() {
    const res = document.getElementById('result');
    if (!res.dataset.text) { 
    generate();
    }
    navigator.clipboard.writeText(res.dataset.text).then(() => {
    document.getElementById('copyOk').style.display = 'block';
    setTimeout(() => document.getElementById('copyOk').style.display = 'none', 2500);
    });
}

function saveLocal() {
    const text = buildText();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const pseudo = document.getElementById('pseudo').value || 'reservation';
    const date = document.getElementById('date').value || new Date().toISOString().slice(0,10);
    a.href = url;
    a.download = `reservation_${pseudo}_${date}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    const res = document.getElementById('result');
    res.style.display = 'block';
    res.textContent = text;
    res.dataset.text = text;

    document.getElementById('saveOk').style.display = 'block';
    setTimeout(() => document.getElementById('saveOk').style.display = 'none', 2500);
}

function sendEmail() {
    const text = buildText();
    const pseudo = document.getElementById('pseudo').value || 'Quelqu\'un';
    const soiree = document.getElementById('soiree').value || 'Soirée kinky';
    const subject = encodeURIComponent(`Réservation pré-session – ${pseudo} – ${soiree}`);
    const body = encodeURIComponent(text);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;

    const res = document.getElementById('result');
    res.style.display = 'block';
    res.textContent = text;
    res.dataset.text = text;
}

function updateCounter() {
    const n = document.querySelectorAll('input[name="pratique"]:checked').length;
    const el = document.getElementById('practiceCounter');
    if (el) el.textContent = n + ' pratique(s)';
    const bar = document.getElementById('progressBar');
    if (bar) bar.style.width = Math.min(100, n * 5) + '%';
    saveForm();
}

function setFilter(col) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b.dataset.filter === col));
    document.querySelectorAll('.practices .col').forEach(c => {
    if (col === 'all') c.style.display = '';
    else c.style.display = c.dataset.col === col ? '' : 'none';
    });
}

function clearCol(col) {
    document.querySelectorAll(`.practices .col[data-col="${col}"] input[name="pratique"]`).forEach(chk => {
    if (!chk.disabled) { chk.checked = false; chk.dispatchEvent(new Event('change')); }
    });
    updateCounter();
}

function toggleTheme() {
    document.body.classList.toggle('theme-light');
    const container = document.querySelector('.container');
    if (container) container.classList.toggle('theme-light');
    localStorage.setItem('formTheme', document.body.classList.contains('theme-light') ? 'light' : 'dark');
}

function applyTemplate(name) {
    document.querySelectorAll('input[name="pratique"]:checked').forEach(c => { c.checked = false; });
    const soft = ['Spanking/Impact','Shibari','Wax Play','Bondage','Pet Play'];
    const intense = ['Spanking/Impact','Discipline','CMC','Needle Play','Handleur','Edge Play'];
    const list = name === 'soft' ? soft : intense;
    list.forEach(v => {
    const el = document.querySelector(`input[name="pratique"][value="${v}"]`);
    if (el && !el.disabled) { el.checked = true; el.dispatchEvent(new Event('change')); }
    });
    const intens = document.querySelector(name === 'soft' ? 'input[name="intensite"][value="Douce"]' : 'input[name="intensite"][value="Intense"]');
    if (intens) intens.checked = true;
    updateCounter();
}

function saveForm() {
    const data = {};
    document.querySelectorAll('input, textarea, select').forEach(el => {
    if (!el.name && !el.id) return;
    const key = el.id || el.name + (el.type === 'checkbox' || el.type === 'radio' ? '_' + el.value : '');
    if (el.type === 'checkbox' || el.type === 'radio') data[key] = el.checked;
    else data[key] = el.value;
    });
    try { localStorage.setItem('reservationForm', JSON.stringify(data)); } catch(e) {}
}

function loadForm() {
    try {
    const raw = localStorage.getItem('reservationForm');
    if (!raw) return;
    const data = JSON.parse(raw);
    Object.entries(data).forEach(([key, val]) => {
        let el = document.getElementById(key);
        if (!el && key.includes('_')) {
        const [name, ...rest] = key.split('_');
        const value = rest.join('_');
        el = document.querySelector(`input[name="${name}"][value="${value}"]`);
        }
        if (!el) return;
        if (el.type === 'checkbox' || el.type === 'radio') {
        el.checked = !!val;
        if (el.checked && el.onchange) el.dispatchEvent(new Event('change'));
        } else el.value = val;
    });
    updateCounter();
    updateFemmeOnly();
    updateLockedPractices();
    } catch(e) {}
    if (localStorage.getItem('formTheme') === 'light') {
    document.body.classList.add('theme-light');
    document.querySelector('.container')?.classList.add('theme-light');
    }
}

function validateForm() {
    if (!document.getElementById('lu_limites')?.checked) {
    alert('Merci de cocher « J\'ai lu les limites du profil ».');
    return false;
    }
    const sw = document.getElementById('safeword')?.value?.trim();
    const rov = document.getElementById('safeword_rov')?.checked;
    if (!sw && !rov) {
    alert('Indique un safeword ou conserve Rouge/Orange/Vert.');
    return false;
    }
    return true;
}

document.getElementById('practiceSearch')?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll('.practices .check-item').forEach(lab => {
    const name = (lab.dataset.name || lab.textContent).toLowerCase();
    lab.style.display = !q || name.includes(q) ? '' : 'none';
    });
});

document.querySelectorAll('input[name="pratique"]').forEach(c => c.addEventListener('change', updateCounter));

const _gen = generate;
generate = function() {
    if (!validateForm()) return;
    _gen();
    saveForm();
};
const _save = saveLocal;
saveLocal = function() {
    if (!validateForm()) return;
    _save();
};
const _mail = sendEmail;
sendEmail = function() {
    if (!validateForm()) return;
    _mail();
};

function exportPDF() {
    if (!validateForm()) return;
    generate();
    const text = document.getElementById('result')?.dataset?.text || '';
    const w = window.open('', '_blank');
    w.document.write('<pre style="font-family:sans-serif;white-space:pre-wrap;padding:24px">' + text.replace(/</g,'&lt;') + '</pre>');
    w.document.close();
    w.print();
}


/* ========== COMPATIBILITÉ CROISÉE ========== */
const COMPAT = {
  'Shibari': ['Wax Play', 'Bondage', 'Privation sensorielle', 'Needle Play'],
  'Spanking/Impact': ['Bondage', 'Discipline', 'Privation sensorielle'],
  'Wax Play': ['Shibari', 'Bondage', 'Privation sensorielle'],
  'Pet Play': ['Service / Protocol', 'Handleur', 'Boot / Foot worship'],
  'CMC': ['Femdom', 'Discipline', 'Service / Protocol', 'Humiliation verbale'],
  'Edge Play': ['Knife Play', 'Breath Play', 'CNC'],
  'CNC': ['Edge Play', 'Bondage', 'Humiliation verbale'],
  'Femdom': ['Gynarchie', 'CMC', 'Face-sitting', 'Boot / Foot worship'],
  'Gynarchie': ['Femdom', 'Service / Protocol', 'CMC'],
};

const RED_PRACTICES = new Set([
  'Knife Play','Edge Play','Needle Play','Fire Play','Breath Play','Medical Play',
  'Sounding','CNC','Gun / threat play','Race Play','BNWO','MNWO','WNWO',
  'MNWO (Muslim NWO)','Blood play'
]);

function updateCompatBox() {
  const selected = [...document.querySelectorAll('input[name="pratique"]:checked')].map(c => c.value);
  const box = document.getElementById('compatBox');
  if (!box) return;
  const suggestions = new Set();
  selected.forEach(p => (COMPAT[p] || []).forEach(s => {
    if (!selected.includes(s)) suggestions.add(s);
  }));
  if (!selected.length || !suggestions.size) {
    box.classList.remove('visible');
    box.textContent = '';
    return;
  }
  box.classList.add('visible');
  box.innerHTML = '<strong>Compatibilité croisée :</strong> souvent associé à → ' +
    [...suggestions].map(s => `<button type="button" class="tpl-btn" style="margin:2px" onclick="quickAddPractice('${s.replace(/'/g,"\\'")}')">${s}</button>`).join(' ');
}

function quickAddPractice(name) {
  const el = document.querySelector(`input[name="pratique"][value="${name}"]`);
  if (el && !el.disabled) {
    el.checked = true;
    el.dispatchEvent(new Event('change'));
    updateCounter();
    updateCompatBox();
    updateRedLimitsBanner();
  }
}

/* ========== PRATIQUES 🔴 ========== */
function selectedRedPractices() {
  return [...document.querySelectorAll('input[name="pratique"]:checked')]
    .map(c => c.value)
    .filter(v => RED_PRACTICES.has(v));
}

function updateRedLimitsBanner() {
  const sticky = document.getElementById('limitsSticky');
  const reds = selectedRedPractices();
  if (sticky) sticky.classList.toggle('visible', reds.length > 0);
  if (reds.length) logConsent('Pratique(s) 🔴 : ' + reds.join(', '));
}

/* ========== MODES ========== */
function updateModes() {
  const first = document.getElementById('mode_first')?.checked;
  const neuro = document.getElementById('mode_neuro')?.checked;
  document.getElementById('banner_first')?.classList.toggle('active', !!first);
  document.getElementById('banner_neuro')?.classList.toggle('active', !!neuro);
  document.body.classList.toggle('mode-neuro', !!neuro);
  // Neuro: hide long italic details inside open sex panels optionally via CSS class
  if (first) logConsent('Mode première fois activé');
  if (neuro) logConsent('Mode neurodivergente activé');
}

/* ========== SCÉNARIOS ========== */
const SCENARIOS = {
  first_soft: {
    practices: ['Spanking/Impact', 'Bondage', 'Privation sensorielle', 'Pet Play'],
    intensite: 'Douce',
    aftercare: ['Couverture / chaleur', 'Discussion / debrief', 'Eau / sucre'],
    note: 'Première fois soft'
  },
  shibari_wax: {
    practices: ['Shibari', 'Wax Play', 'Privation sensorielle'],
    intensite: 'Moyenne',
    aftercare: ['Couverture / chaleur', 'Discussion / debrief'],
    note: 'Shibari + Wax'
  },
  pet_service: {
    practices: ['Pet Play', 'Service / Protocol', 'Boot / Foot worship', 'Handleur'],
    intensite: 'Moyenne',
    aftercare: ['Câlins', 'Discussion / debrief'],
    note: 'Pet + Service'
  },
  impact_bondage: {
    practices: ['Spanking/Impact', 'Bondage', 'Discipline'],
    intensite: 'Intense',
    aftercare: ['Couverture / chaleur', 'Eau / sucre', 'Discussion / debrief'],
    note: 'Impact + Bondage'
  },
  protocol_soir: {
    practices: ['Service / Protocol', 'Discipline', 'BDSM'],
    intensite: 'Moyenne',
    aftercare: ['Discussion / debrief'],
    note: 'Protocol soirée'
  },
  intense_dom: {
    practices: ['Spanking/Impact', 'Discipline', 'CMC', 'Handleur', 'Bondage'],
    intensite: 'Intense',
    aftercare: ['Couverture / chaleur', 'Discussion / debrief', 'Eau / sucre'],
    note: 'Intense Dom'
  }
};

function applyScenario(key) {
  const sc = SCENARIOS[key];
  if (!sc) return;
  document.querySelectorAll('input[name="pratique"]:checked').forEach(c => {
    c.checked = false;
    c.dispatchEvent(new Event('change'));
  });
  sc.practices.forEach(v => {
    const el = document.querySelector(`input[name="pratique"][value="${v}"]`);
    if (el && !el.disabled) {
      el.checked = true;
      el.dispatchEvent(new Event('change'));
    }
  });
  const intens = document.querySelector(`input[name="intensite"][value="${sc.intensite}"]`);
  if (intens) intens.checked = true;
  (sc.aftercare || []).forEach(v => {
    const a = document.querySelector(`input[name="aftercare"][value="${v}"]`);
    if (a) a.checked = true;
  });
  if (key === 'first_soft') {
    const mf = document.getElementById('mode_first');
    if (mf) { mf.checked = true; updateModes(); }
  }
  updateCounter();
  updateCompatBox();
  updateRedLimitsBanner();
  logConsent('Scénario appliqué : ' + sc.note);
}

/* ========== MULTI-SESSIONS ========== */
let sessionCount = 0;
function addSessionSlot(data = {}) {
  sessionCount++;
  const id = sessionCount;
  const wrap = document.getElementById('sessionSlots');
  if (!wrap) return;
  const div = document.createElement('div');
  div.className = 'session-slot';
  div.dataset.slot = id;
  div.innerHTML = `
    <h4>Créneau ${id} <button type="button" class="clear-btn" style="float:right" onclick="this.closest('.session-slot').remove(); logConsent('Créneau ${id} supprimé')">Supprimer</button></h4>
    <label>Nom du créneau</label>
    <input type="text" name="slot_name_${id}" placeholder="ex: Warm-up / Scène principale / After" value="${data.name || ''}">
    <label>Horaire</label>
    <div class="dur-row">
      <input type="time" name="slot_start_${id}" value="${data.start || ''}" aria-label="Début créneau ${id}">
      <span>–</span>
      <input type="time" name="slot_end_${id}" value="${data.end || ''}" aria-label="Fin créneau ${id}">
    </div>
    <label>Focus pratiques (libre)</label>
    <input type="text" name="slot_focus_${id}" placeholder="ex: Shibari puis Wax" value="${data.focus || ''}">
  `;
  wrap.appendChild(div);
  logConsent('Créneau ' + id + ' ajouté');
}

function collectSessions() {
  return [...document.querySelectorAll('.session-slot')].map(slot => {
    const id = slot.dataset.slot;
    return {
      name: slot.querySelector(`[name="slot_name_${id}"]`)?.value || '',
      start: slot.querySelector(`[name="slot_start_${id}"]`)?.value || '',
      end: slot.querySelector(`[name="slot_end_${id}"]`)?.value || '',
      focus: slot.querySelector(`[name="slot_focus_${id}"]`)?.value || ''
    };
  }).filter(s => s.name || s.start || s.focus);
}

/* ========== JOURNAL CONSENTEMENT ========== */
const consentEvents = [];
function logConsent(msg) {
  const ts = new Date().toLocaleString('fr-FR');
  consentEvents.push(`[${ts}] ${msg}`);
  const el = document.getElementById('consentLog');
  if (el) el.textContent = consentEvents.slice(-30).join('\n');
}

/* ========== TEST UNLOCK : pseudo noUNi + date 08/07/2000 ========== */
function isTestUnlocked() {
  const pseudo = (document.getElementById('pseudo')?.value || '').trim();
  const date = (document.getElementById('date')?.value || '').trim();
  const pseudoOk = pseudo === 'noUNi' || pseudo === 'no⋃Ni' || pseudo === 'noUni';
  // input type=date → YYYY-MM-DD
  const dateOk = date === '2000-07-08' || date === '08/07/2000' || date === '08-07-2000';
  return pseudoOk && dateOk;
}

function updateTestColumnVisibility() {
  const practices = document.querySelector('.practices');
  const unlocked = isTestUnlocked();
  if (practices) practices.classList.toggle('test-unlocked', unlocked);

  document.querySelectorAll('.filter-btn[data-filter="test"]').forEach(btn => {
    btn.style.display = unlocked ? '' : 'none';
  });

  if (!unlocked) {
    const col = document.querySelector('.col[data-col="test"]');
    col?.querySelectorAll('input[name="pratique"]').forEach(chk => {
      if (chk.checked) {
        chk.checked = false;
        chk.dispatchEvent(new Event('change'));
      }
    });
    // close test-only subforms if any open
  }
}

/* ========== VALIDATION RENFORCÉE ========== */
function validateForm() {
  if (!document.getElementById('lu_limites')?.checked) {
    alert('Merci de cocher « J\'ai lu les limites du profil ».');
    return false;
  }
  if (!document.getElementById('engage')?.checked) {
    alert('Merci de cocher « Je m\'engage à respecter le cadre ».');
    return false;
  }
  const sw = document.getElementById('safeword')?.value?.trim();
  const rov = document.getElementById('safeword_rov')?.checked;
  if (!sw && !rov) {
    alert('Indique un safeword ou conserve Rouge/Orange/Vert.');
    return false;
  }
  const fw = document.querySelectorAll('input[name="framework"]:checked');
  if (!fw.length) {
    alert('Choisis au moins un cadre : SSC, RACK ou PRICK.');
    return false;
  }
  const reds = selectedRedPractices();
  if (reds.length) {
    const after = document.querySelectorAll('input[name="aftercare"]:checked');
    if (!after.length) {
      alert('Pratique(s) 🔴 sélectionnée(s) (' + reds.join(', ') + '). Coche au moins une option d\'aftercare avant envoi / export.');
      return false;
    }
  }
  if (document.getElementById('mode_first')?.checked && reds.length) {
    const ok = confirm('Mode « première fois » actif avec pratique(s) 🔴 : ' + reds.join(', ') + '. Continuer ?');
    if (!ok) return false;
  }
  return true;
}

/* ========== BUILD TEXT enrichi ========== */
const _buildTextOriginal = typeof buildText === 'function' ? buildText : null;

function buildTextEnhanced() {
  let base = '';
  // call existing buildText body by temporarily using original logic
  // We'll prepend session meta
  const sessions = collectSessions();
  const reds = selectedRedPractices();
  const meta = `
Mode première fois : ${document.getElementById('mode_first')?.checked ? 'Oui' : 'Non'}
Options neurodivergentes : ${document.getElementById('mode_neuro')?.checked ? 'Oui' : 'Non'}
Cadre consentement : ${getVal('framework', 'checkbox')}
Safe call : ${document.getElementById('safecall')?.value || '—'}
Check-in prévu : ${document.getElementById('safecall_time')?.value || '—'}
Durée globale : ${document.getElementById('duree_globale_min')?.value || '—'} – ${document.getElementById('duree_globale_max')?.value || '—'} min
Pratiques 🔴 : ${reds.length ? reds.join(', ') : 'Aucune'}

Créneaux :
${sessions.length ? sessions.map((s,i) => `  ${i+1}. ${s.name || 'Créneau'} | ${s.start || '?'}–${s.end || '?'} | ${s.focus || '—'}`).join('\n') : '  —'}

Journal consentement :
${consentEvents.slice(-15).join('\n') || '  —'}
`;
  return meta;
}

/* Hook generate/save/mail with validation already partially there — replace validateForm globally */

function isTestUnlockedAndWire() {
  updateTestColumnVisibility();
}

// Wire events
function wireNewFeatures() {
  ['pseudo', 'date'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', updateTestColumnVisibility);
    el.addEventListener('change', updateTestColumnVisibility);
  });
  document.querySelectorAll('input[name="pratique"]').forEach(c => {
    c.addEventListener('change', () => {
      updateCounter();
      updateCompatBox();
      updateRedLimitsBanner();
    });
  });
  // Patch generate wrappers if not already validating red aftercare
  const origGenerate = window.generate;
  window.generate = function() {
    if (!validateForm()) return;
    origGenerate();
    const res = document.getElementById('result');
    if (res?.dataset?.text) {
      res.dataset.text = buildTextEnhanced() + '\n' + res.dataset.text;
      res.textContent = res.dataset.text;
    }
    logConsent('Résumé généré');
    saveForm();
  };
  const origMail = window.sendEmail;
  window.sendEmail = function() {
    if (!validateForm()) return;
    // force enhanced text
    window.generate();
    const text = document.getElementById('result')?.dataset?.text || '';
    const pseudo = document.getElementById('pseudo').value || 'Quelqu\'un';
    const soiree = document.getElementById('soiree').value || 'Soirée kinky';
    const subject = encodeURIComponent(`Réservation pré-session – ${pseudo} – ${soiree}`);
    const body = encodeURIComponent(text);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };
  const origSave = window.saveLocal;
  window.saveLocal = function() {
    if (!validateForm()) return;
    window.generate();
    const text = document.getElementById('result')?.dataset?.text || buildText();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const pseudo = document.getElementById('pseudo').value || 'reservation';
    const date = document.getElementById('date').value || new Date().toISOString().slice(0,10);
    a.href = url;
    a.download = `reservation_${pseudo}_${date}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    logConsent('Sauvegarde locale');
  };

  updateTestColumnVisibility();
  if (!document.querySelectorAll('#sessionSlots .session-slot').length) {
    addSessionSlot({ name: 'Scène principale' });
  }
  logConsent('Formulaire chargé');
}

window.addEventListener('DOMContentLoaded', () => {
  if (typeof loadForm === 'function') loadForm();
  wireNewFeatures();
});
