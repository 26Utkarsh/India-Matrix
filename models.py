from pydantic import BaseModel
from typing import List, Optional

class NationalMetric(BaseModel):
    year: int
    gdp_usd_billion: float
    gdp_inr_crore: float
    gdp_growth_pct: float
    population_million: float
    literacy_pct: float
    life_expectancy: float
    infant_mortality: float
    electricity_access_pct: float
    internet_penetration_pct: float
    urbanization_pct: float
    exports_usd_billion: float
    railway_km: float
    highway_km: float
    power_capacity_gw: float
    forex_reserves_usd_billion: float
    inflation_cpi_pct: float

class PrimeMinister(BaseModel):
    id: int
    name: str
    party: str
    party_abbr: str
    start_year: int
    end_year: int
    start_date: str
    end_date: str
    days_in_office: int
    coalition: str
    majority: bool
    image_url: str
    avg_gdp_growth: float
    inflation_avg: float
    gdp_start_usd: float
    gdp_end_usd: float
    economic_score: int
    social_score: int
    foreign_score: int
    governance_score: int
    legacy_score: int
    major_policies: List[str]
    wars_conflicts: List[str]
    nuclear_milestones: List[str]
    space_milestones: List[str]
    legacy_note: str

class GeopoliticalEvent(BaseModel):
    id: int
    year: int
    name: str
    type: str  # war, reform, crisis, milestone, nuclear, space, election, diplomatic
    description: str
    pm_id: int
    leaders: List[str]
    economic_impact: str
    gdp_impact_pct: Optional[float] = None
    long_term_impact: str
