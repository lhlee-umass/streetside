alias dis='docker inspect --format=\'{{.Name}} -> {{range $p, $conf := .NetworkSettings.Ports}}{{$p}} -> {{(index $conf 0).HostPort}}{{"\n"}}{{end}}\' $(docker ps -q)'

