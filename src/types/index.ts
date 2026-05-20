export interface NationalMetric {
  year: number;
  gdp_usd_billion: number;
  gdp_inr_crore: number;
  gdp_growth_pct: number;
  population_million: number;
  literacy_pct: number;
  life_expectancy: number;
  infant_mortality: number;
  electricity_access_pct: number;
  internet_penetration_pct: number;
  urbanization_pct: number;
  exports_usd_billion: number;
  railway_km: number;
  highway_km: number;
  power_capacity_gw: number;
  forex_reserves_usd_billion: number;
  inflation_cpi_pct: number;
}

export interface PrimeMinisters {
  id: number;
  name: string;
  party: string;
  party_abbr: string;
  coalition: string;
  start_year: number;
  end_year: number;
  start_date: string;
  end_date: string;
  image_url: string;
  constituency: string;
  education: string;
  ideology: string[];
  avg_gdp_growth: number;
  gdp_start_usd: number;
  gdp_end_usd: number;
  poverty_change_pct: number;
  literacy_change_pct: number;
  inflation_avg: number;
  major_policies: string[];
  wars_conflicts: string[];
  nuclear_milestones: string[];
  space_milestones: string[];
  legacy_score: number;
  economic_score: number;
  social_score: number;
  foreign_score: number;
  governance_score: number;
  legacy_note: string;
  majority: boolean;
}

export interface GeopoliticalEvent {
  id: number;
  year: number;
  name: string;
  type: 'war' | 'reform' | 'crisis' | 'milestone' | 'nuclear' | 'space' | 'election' | 'diplomatic';
  description: string;
  leaders: string[];
  economic_impact: string;
  gdp_impact_pct?: number;
  long_term_impact: string;
  pm_id: number;
}

export interface StateData {
  id: number;
  name: string;
  capital: string;
  formation_year: number;
  area_sqkm: number;
  language: string;
  gsdp_usd_billion: number;
  population_million: number;
  literacy_pct: number;
  hdi: number;
  cm_name: string;
  cm_party: string;
  infant_mortality: number;
  electricity_pct: number;
  internet_pct: number;
}

export interface Module {
  id: number;
  slug: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}
