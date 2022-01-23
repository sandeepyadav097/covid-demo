export const formatDataSource= (users) => {
    const temp = [...users].splice(0,users.length-1)
    const data = temp.map((user, i) => {
      return { 
      sno:i+1,
      state_name:user.state_name,
      new_cured:user.new_cured + " ⇧ ⇩",
      new_death:user.new_death,
      new_active:user.new_active
      }
    })
  
    return data;
  }
  
export   const  columns = () =>{
      return [
        {
          title: 'S.no',
          dataIndex: 'sno',
          key: 'sno'
        },
        {
          title: 'State Name',
          dataIndex: 'state_name',
          key: 'state_name',
        },
        {
          title: 'Active',
          dataIndex: 'new_active',
          key: 'new_active',
          sorter: (a, b) => a.new_active - b.new_active,
        },
        {
          title: 'Cured',
          dataIndex: 'new_cured',
          key: 'new_cured',
          sorter: (a, b) => a.cured - b.cured,
        },
        {
          title: 'Death',
          dataIndex: 'new_death',
          key: 'new_death',
          sorter: (a, b) => a.death - b.death,
        },
      ];
    }