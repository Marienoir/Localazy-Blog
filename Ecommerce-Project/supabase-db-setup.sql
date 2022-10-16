-- Create clients table
create table
  if not exists clients (
    id uuid not null primary key DEFAULT uuid_generate_v4(),
    name text not null,
    email text,
    phone text,
    user_id uuid not null references auth.users DEFAULT auth.uid(),
    created_at timestamp
    with
      time zone default timezone('utc':: text, now()) not null
  );

-- Enable row level security for clients
alter table
  clients enable row level security;

-- Create policy for clients that users can only create/read/update/delete their own clients
drop policy if exists "Users can only access their own clients" on clients;

create policy "Users can only access their own clients" on clients for all using (auth.uid() = user_id);