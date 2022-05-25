class ChipsAhoy{
    static async getMeCookies()
    {
      let temp;
      temp = await getCookies();
      if(temp != null){
        return temp;
      }
    }
  }