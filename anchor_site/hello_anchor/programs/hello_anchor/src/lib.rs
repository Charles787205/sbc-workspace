use anchor_lang::prelude::*;

declare_id!("GDyMc5kxzHhREL5jcLTGEnR1Xc3tL8aifJqnLQ7fJkd2");

#[program]
pub mod hello_anchor {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
